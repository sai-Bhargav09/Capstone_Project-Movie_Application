package com.niit.Movie_Service.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT,reason = "Invalid movie id")
public class MovieIdNotFoundException extends Exception{
    public MovieIdNotFoundException(){super("Invalid movie id");}
}
