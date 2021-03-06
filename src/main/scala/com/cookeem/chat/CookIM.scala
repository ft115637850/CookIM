package com.cookeem.chat

import java.net.InetAddress
import java.security.{KeyStore, SecureRandom}
import javax.net.ssl.{KeyManagerFactory, SSLContext, TrustManagerFactory}

import akka.actor.{ActorSystem, Props}
import akka.http.scaladsl.model.headers.{HttpOrigin, HttpOriginRange}
import akka.http.scaladsl.model.HttpMethods._
import akka.http.scaladsl.model.StatusCodes
import akka.http.scaladsl.server.{ExceptionHandler, RejectionHandler}
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.{ConnectionContext, Http, HttpsConnectionContext}
import akka.stream.ActorMaterializer
import com.cookeem.chat.common.CommonUtils._
import com.cookeem.chat.restful.Route
import com.cookeem.chat.websocket.NotificationActor
import com.typesafe.config.ConfigFactory
import org.apache.commons.cli.{DefaultParser, HelpFormatter, Options, Option => CliOption}
import com.cookeem.chat.common.CommonUtils
import ch.megard.akka.http.cors.CorsDirectives._
import ch.megard.akka.http.cors.CorsSettings

import scala.collection.immutable

/**
  * Created by cookeem on 16/9/25.
  */
object CookIM extends App {
  val serverContext: ConnectionContext = if (CommonUtils.configSslSecret != "") {
    val password = CommonUtils.configSslSecret.toCharArray
    val jks = "/mykeystore.jks"
    val context = SSLContext.getInstance("TLS")
    val ks = KeyStore.getInstance("jks")
    ks.load(getClass.getResourceAsStream(jks), password)
    val keyManagerFactory = KeyManagerFactory.getInstance("SunX509")
    keyManagerFactory.init(ks, password)
    val trustManagerFactory = TrustManagerFactory.getInstance("SunX509")
    trustManagerFactory.init(ks)
    context.init(keyManagerFactory.getKeyManagers, trustManagerFactory.getTrustManagers, new SecureRandom)
    new HttpsConnectionContext(context)
  } else {
    ConnectionContext.noEncryption()
  }

  val options = new Options()
  options.addOption(
    CliOption
      .builder("n")
      .longOpt("nat")
      .desc("is nat network or in docker")
      .hasArg(false)
      .build()
  )
  options.addOption(
    CliOption
      .builder("h")
      .longOpt("host-name")
      .desc("current web service external host name")
      .hasArg()
      .required()
      .argName("HOST-NAME")
      .build()
  )
  options.addOption(
    CliOption
      .builder("w")
      .longOpt("web-port")
      .desc("web service port")
      .hasArg()
      .required()
      .argName("WEB-PORT")
      .build()
  )
  options.addOption(
    CliOption
      .builder("a")
      .longOpt("akka-port")
      .desc("akka cluster node port")
      .hasArg()
      .required()
      .argName("AKKA-PORT")
      .build()
  )
  options.addOption(
    CliOption
      .builder("s")
      .longOpt("seed-nodes")
      .desc("akka cluster seed nodes, seperate with comma, example: localhost:2551,localhost:2552")
      .hasArg()
      .required()
      .argName("SEED-NODES")
      .build()
  )
  options.addOption(
    CliOption
      .builder("m")
      .longOpt("mongo-uri")
      .desc("mongodb connection uri, example: mongodb://localhost:27017/local")
      .hasArg()
      .required(false)
      .argName("MONGO-URI")
      .build()
  )
  try {
    val parser = new DefaultParser()
    val cmd = parser.parse(options, args)
    val nat = cmd.hasOption("n")
    val hostName = cmd.getOptionValue("h")
    val webPort = cmd.getOptionValue("w").toInt
    val akkaPort = cmd.getOptionValue("a").toInt
    val seedNodes = cmd.getOptionValue("s")
    var mongoUri = cmd.getOptionValue("m")
    if (mongoUri != null) {
      configMongoUri = mongoUri
    }
    if (!(webPort > 0 && akkaPort > 0)) {
      throw CustomException("web-port and akka-port should greater than 0")
    } else if (hostName == "" || seedNodes == "") {
      throw CustomException("host-name and seed-nodes should not be empty")
    } else {
      val seedNodesStr = seedNodes.split(",").map(s => s""" "akka.tcp://chat-cluster@$s" """).mkString(",")
      val inetAddress = InetAddress.getLocalHost
      var configCluster = config
        .withFallback(ConfigFactory.parseString(s"akka.cluster.seed-nodes=[$seedNodesStr]"))
      if (!nat) {
        configCluster = configCluster
          .withFallback(ConfigFactory.parseString(s"akka.remote.netty.tcp.hostname=$hostName"))
          .withFallback(ConfigFactory.parseString(s"akka.remote.netty.tcp.port=$akkaPort"))
      } else {
        //very important in docker nat!
        //must set akka.remote.netty.tcp.bind-hostname
        //notice! akka.remote.netty.tcp.bind-port must set to akkaPort!!
        val bindHostName = inetAddress.getHostName
        configCluster = configCluster
          .withFallback(ConfigFactory.parseString(s"akka.remote.netty.tcp.hostname=$hostName"))
          .withFallback(ConfigFactory.parseString(s"akka.remote.netty.tcp.port=0"))
          .withFallback(ConfigFactory.parseString(s"akka.remote.netty.tcp.bind-hostname=$bindHostName"))
          .withFallback(ConfigFactory.parseString(s"akka.remote.netty.tcp.bind-port=$akkaPort"))
      }
      implicit val system = ActorSystem("chat-cluster", configCluster)
      implicit val materializer = ActorMaterializer()
      import system.dispatcher
      implicit val notificationActor = system.actorOf(Props(classOf[NotificationActor]))

      val settings = CorsSettings.defaultSettings.copy(
        allowedOrigins = HttpOriginRange(
          HttpOrigin("http://localhost:3000"),
          HttpOrigin("http://localhost:8080"),
          HttpOrigin("https://im.cookeem.com")
        ),
        allowedMethods = immutable.Seq(GET, POST, HEAD, OPTIONS, PUT)
      )

      val rejectionHandler = corsRejectionHandler withFallback RejectionHandler.default

      val exceptionHandler = ExceptionHandler {
        case e: NoSuchElementException => complete(StatusCodes.NotFound -> e.getMessage)
      }

      val handleErrors = handleRejections(rejectionHandler) & handleExceptions(exceptionHandler)

      val route = handleRejections(corsRejectionHandler) {
        cors(settings)(
          handleErrors {
            Route.logRoute
          }
        )
      }

      Http().bindAndHandle(route, "0.0.0.0", webPort, connectionContext = serverContext)
      consoleLog("INFO",s"CookIM server started! Access url: https://$hostName:$webPort/")
    }
  } catch {
    case e: Throwable =>
      val formatter = new HelpFormatter()
      consoleLog("ERROR", s"$e")
      formatter.printHelp("Start distributed chat cluster node.\n", options, true)
  }
}
