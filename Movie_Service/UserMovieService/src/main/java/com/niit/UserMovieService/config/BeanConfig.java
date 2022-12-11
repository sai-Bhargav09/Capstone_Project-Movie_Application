package com.niit.UserMovieService.config;

import com.niit.UserMovieService.filter.JwtFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BeanConfig {
    @Bean
    public FilterRegistrationBean jwtFilterBean(){
        FilterRegistrationBean filterRB = new FilterRegistrationBean();
        filterRB.setFilter(new JwtFilter());
        filterRB.addUrlPatterns("/app/movie/*");
        return filterRB;
    }
}
