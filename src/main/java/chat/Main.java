/*
 * Copyright 2008-2022 Async-IO.org
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
package chat;

import org.atmosphere.cpr.ApplicationConfig;
import org.atmosphere.cpr.AtmosphereServlet;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.ServerConnector;
import org.eclipse.jetty.server.handler.HandlerList;
import org.eclipse.jetty.server.handler.ResourceHandler;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.eclipse.jetty.websocket.server.NativeWebSocketServletContainerInitializer;
import org.eclipse.jetty.websocket.server.WebSocketUpgradeFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.websocket.server.ServerContainer;
import java.io.File;

public class Main {
    private static final Logger log = LoggerFactory.getLogger(Main.class);

    public static void main(String[] args) throws Exception {
        Main main = new Main();
        main.run();
    }

    private void run() throws Exception {
        // Initialize Jetty Server
        Server server = new Server();

        // Configure ServerConnector
        ServerConnector connector = new ServerConnector(server);
        connector.setPort(8071);
        connector.setIdleTimeout(30000); // 30 seconds idle timeout
        server.addConnector(connector);

        // Setup ResourceHandler for serving static content
        ResourceHandler resourceHandler = new ResourceHandler();
        resourceHandler.setDirectoriesListed(true);
        resourceHandler.setWelcomeFiles(new String[]{"index.html"});
        resourceHandler.setResourceBase(new File("C:\\Users\\bichh\\eclipse-workspace\\JavaPrac\\v3.x_jdk8_atmos_POC\\src\\main\\webapp").getAbsolutePath());

        // Setup ServletContextHandler for Atmosphere
        ServletContextHandler contextHandler = new ServletContextHandler(ServletContextHandler.SESSIONS);
        contextHandler.setContextPath("/");

        // Ensure WebSocket support is initialized before Atmosphere
        NativeWebSocketServletContainerInitializer.configure(contextHandler, (servletContext, wsContainer) -> {
            wsContainer.setStopTimeout(60000);// .setDefaultMaxSessionIdleTimeout(60000); // 60 seconds idle timeout
        });

        // Configure AtmosphereServlet
        ServletHolder atmosphereServletHolder = new ServletHolder(AtmosphereServlet.class);
        atmosphereServletHolder.setInitParameter(ApplicationConfig.ANNOTATION_PACKAGE, "org.atmosphere.samples.chat");
        atmosphereServletHolder.setInitParameter(ApplicationConfig.WEBSOCKET_CONTENT_TYPE, "application/json");
        atmosphereServletHolder.setAsyncSupported(true);
        contextHandler.addServlet(atmosphereServletHolder, "/chat/*");

        // Add handlers to server
        HandlerList handlers = new HandlerList();
        handlers.addHandler(resourceHandler);
        handlers.addHandler(contextHandler);

        server.setHandler(handlers);
        server.setStopAtShutdown(true);

        try {
            server.start();
            server.join();
        } catch (Exception e) {
            log.error("Failed to start server", e);
            System.exit(1);
        }
    }
}

//
//import org.atmosphere.cpr.ApplicationConfig;
//import org.atmosphere.cpr.AtmosphereServlet;
//import org.eclipse.jetty.server.*;
//import org.eclipse.jetty.server.handler.HandlerList;
//import org.eclipse.jetty.server.handler.ResourceHandler;
//import org.eclipse.jetty.servlet.ServletContextHandler;
//import org.eclipse.jetty.servlet.ServletHolder;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//
//import java.io.File;
//
//public class Main {
//    private static final Logger log = LoggerFactory.getLogger(Main.class);
//
//    public static void main(String[] args) throws Exception {
//        Main main = new Main();
//        main.run();
//    }
//
//    private void run() throws Exception {
//        Server server = new Server();
//
//        HttpConfiguration http_config = new HttpConfiguration();
//        http_config.addCustomizer(new ForwardedRequestCustomizer());
//
//        ServerConnector http = new ServerConnector(server, new HttpConnectionFactory(http_config));
//        http.setPort(8071);
//        http.setIdleTimeout(30000);
//
//        server.setConnectors(new Connector[]{http});
//
//        ResourceHandler resource_handler = new ResourceHandler();
//        resource_handler.setDirectoriesListed(true);
//        resource_handler.setWelcomeFiles(new String[]{ "index.html" });
//
//        // this sample loads all resources from target/webapp
//        resource_handler.setResourceBase(new File("C:\\Users\\bichh\\eclipse-workspace\\JavaPrac\\v3.x_jdk8_atmos_POC\\src\\main\\webapp").getAbsolutePath());
//
//        ServletHolder atmosphereServletHolder = new ServletHolder(AtmosphereServlet.class);
//
//        atmosphereServletHolder.setInitParameter(ApplicationConfig.ANNOTATION_PACKAGE, "org.atmosphere.samples.chat");
//        atmosphereServletHolder.setInitParameter(ApplicationConfig.WEBSOCKET_CONTENT_TYPE, "application/json");
//        //atmosphereServletHolder.setInitParameter(ApplicationConfig.PROPERTY_COMET_SUPPORT, Jetty9AsyncSupportWithWebSocket.class.getName());
//
//
//        atmosphereServletHolder.setAsyncSupported(true);
//
//        ServletContextHandler servletContextHandler = new ServletContextHandler(ServletContextHandler.SESSIONS);
//        servletContextHandler.addServlet(atmosphereServletHolder, "/chat/*");
//
//        // WebSocket initialization
//        org.eclipse.jetty.websocket.server.NativeWebSocketServletContainerInitializer.configure(servletContextHandler, null);
//
//
//        HandlerList handlers = new HandlerList();
//        handlers.setHandlers(new Handler[] { resource_handler, servletContextHandler });
//
//        server.setHandler(handlers);
//        server.setStopAtShutdown(true);
//        server.start();
//        server.join();
//    }
//}
