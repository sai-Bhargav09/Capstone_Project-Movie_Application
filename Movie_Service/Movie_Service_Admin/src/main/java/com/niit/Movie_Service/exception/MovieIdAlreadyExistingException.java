package com.niit.Movie_Service.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT, reason = "Movie Id already exists")
public class MovieIdAlreadyExistingException extends Exception{

    public MovieIdAlreadyExistingException(){
        super("Movie Id already exists");
    }
}
