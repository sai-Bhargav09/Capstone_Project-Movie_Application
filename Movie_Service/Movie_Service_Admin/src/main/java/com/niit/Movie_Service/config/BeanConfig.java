package com.niit.Movie_Service.config;

import com.niit.Movie_Service.filter.JwtFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BeanConfig {

    @Bean
    public FilterRegistrationBean jwtFilterBean(){
        FilterRegistrationBean filterRB = new FilterRegistrationBean();
        filterRB.setFilter(new JwtFilter());
        filterRB.addUrlPatterns("/appl/movie/*");
        return filterRB;
    }
}
