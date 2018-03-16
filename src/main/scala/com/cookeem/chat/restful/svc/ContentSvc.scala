package com.cookeem.chat.restful.svc

import akka.http.scaladsl.model._
import akka.http.scaladsl.server.Directives
import akka.http.scaladsl.server.Directives.complete
import akka.http.scaladsl.server.directives.Credentials
import com.cookeem.chat.jwt.JwtOps.JWT
import com.cookeem.chat.restful.Controller.listUsrSessions
import play.api.libs.json.Json

import scala.concurrent.ExecutionContext

/**
  * Created by Zou, Newton Xing on 2018/3/16.
  */
class ContentSvc (implicit ec: ExecutionContext) extends Directives {
  val tokenAuthenticator: AuthenticatorPF[Map[String, Any]] = {
    case Credentials.Provided(JWT(usr)) if usr.contains("uid") => usr
  }

  val route = authenticateOAuth2PF(realm = "secure site", tokenAuthenticator) {
    usr => getSessions(usr)
  }

  def getSessions(usr :Map[String, Any]) =
    path("api" / "v2" / Segment / "listSessions" ~ Slash.?) { isPublicOrPrivate =>
      options {
        complete(HttpResponse(
          200,
          entity = HttpEntity(ContentType(MediaTypes.`application/json`), "")
        ))
      } ~ get {
        val isPublic = isPublicOrPrivate match {
          case "public" => true
          case _ => false
        }
        complete {
          listUsrSessions(usr("uid").toString, isPublic) map { json =>
            HttpEntity(ContentTypes.`application/json`, Json.stringify(json))
          }
        }
      }
    }
}
