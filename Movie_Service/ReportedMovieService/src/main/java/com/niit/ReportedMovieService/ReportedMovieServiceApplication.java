package com.niit.ReportedMovieService;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class ReportedMovieServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ReportedMovieServiceApplication.class, args);
	}

}
