package com.niit.UserAuth.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Email Not Registered")
public class UserNotFoundException extends Exception{
}
