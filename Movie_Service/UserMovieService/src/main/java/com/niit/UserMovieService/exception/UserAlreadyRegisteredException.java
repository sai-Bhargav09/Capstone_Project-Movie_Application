package com.niit.UserMovieService.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT,reason = "User is already registered")
public class UserAlreadyRegisteredException extends Exception {
}
