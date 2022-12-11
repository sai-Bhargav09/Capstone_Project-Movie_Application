package com.niit.UserAuth;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.netflix.hystrix.EnableHystrix;
import org.springframework.context.annotation.Bean;
import org.springframework.core.Ordered;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@SpringBootApplication
@EnableEurekaClient
@EnableHystrix
public class UserAuthApplication {

	public static void main(String[] args) {
		SpringApplication.run(UserAuthApplication.class, args);
	}

//	@Bean
//	public FilterRegistrationBean filterRegistrationBean(){
//		final CorsConfiguration corsConfig = new CorsConfiguration();
//		corsConfig.setAllowCredentials(true);
//		corsConfig.addAllowedOrigin("http://localhost:4200");
//		corsConfig.addAllowedHeader("*");
//		corsConfig.addAllowedMethod("*");
//
//		final UrlBasedCorsConfigurationSource src = new UrlBasedCorsConfigurationSource();
//		src.registerCorsConfiguration("/**",corsConfig);
//
//		FilterRegistrationBean frb = new FilterRegistrationBean(new CorsFilter(src));
//		frb.setOrder(Ordered.HIGHEST_PRECEDENCE);
//
//		return frb;
//	}

}
