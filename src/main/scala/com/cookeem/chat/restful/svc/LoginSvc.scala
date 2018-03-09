package com.cookeem.chat.restful.svc
/**
  * Created by Zou, Newton Xing on 2018/2/13.
  */
import akka.http.scaladsl.model.{ContentType, HttpEntity, HttpResponse, MediaTypes}
import akka.http.scaladsl.server.Directives
import akka.http.scaladsl.server.directives.Credentials

import scala.concurrent.{ExecutionContext, Future}
import com.cookeem.chat.common.CommonUtils.sha1
import com.cookeem.chat.mongo.MongoLogic.{createUserToken, fetchUser}
import play.api.libs.json.Json

class LoginSvc(implicit ec: ExecutionContext) extends Directives {
  case class User(pwd: String)

  val userPwdAuthenticator: AsyncAuthenticatorPF[(String, String, String)] = {
    case p @ Credentials.Provided(login) =>
      fetchUser(login).map {
        case (pwdSha1, uid) if p.verify(pwdSha1, sha1) =>
          (login, uid, "login in success")
        case _ =>
          (login, "", "user not exist or password not match")
      }
    case _ =>
      Future(("", "", "www-Authorization error"))
  }

  val route = authenticateBasicPFAsync(realm = "secure site", userPwdAuthenticator) {
    userInfo => login(userInfo)
  }

  def login(userInfo :(String, String, String)) =
    path("api" / "v2" / "login" ~ Slash.?) {
      options {
        val result = """{"result" : "ok"}""".stripMargin
        complete(HttpResponse(
          200,
          entity = HttpEntity(ContentType(MediaTypes.`application/json`), result)
        ))
      } ~ get {
        if (userInfo._1 == "") {
          val result = Json.obj(
            "login" -> userInfo._1,
            "uid" -> userInfo._2,
            "msg" -> userInfo._3
          ).toString()
          complete(HttpResponse(
            500,
            entity = HttpEntity(ContentType(MediaTypes.`application/json`), result)
          ))
        } else {
          onComplete(createUserToken(userInfo._2)) {
            case token =>
              val result = Json.obj(
                "login" -> userInfo._1,
                "uid" -> userInfo._2,
                "userToken" -> token.getOrElse("").toString,
                "msg" -> userInfo._3
              ).toString()
              complete(HttpResponse(
                200,
                entity = HttpEntity(ContentType(MediaTypes.`application/json`), result)
              ))
          }
        }
      }
    }
}
