package com.niit.GatewayAPI.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class APIConfig {

    @Bean
    public RouteLocator routing(RouteLocatorBuilder rlb){
        return rlb.routes().
                route(i->
                        i.path("/app/auth/**").
                                uri("http://localhost:8082/*")). //auth - working
                route(p->
                        p.path("/app/**").
                                uri("http://localhost:8085/*")). //user-movie-service - working
                route(q->
                        q.path("/appl/**")
                                .uri("http://localhost:8088/*")). //admin-movie-service - working
                route(k->
                        k.path("/appli/**")
                                .uri("http://localhost:8092/*")). //reported-movie-service - working
                build();
    }
}
