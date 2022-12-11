package com.niit.UserAuth.controller;

import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixProperty;
import com.niit.UserAuth.Exception.UserAlreadyExistsException;
import com.niit.UserAuth.Exception.UserNotFoundException;
import com.niit.UserAuth.model.User;
import com.niit.UserAuth.security.SecurityTokenGenerator;
import com.niit.UserAuth.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
//@CrossOrigin("*")//Handling CORS exception
@RestController
@RequestMapping("/app/auth")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private SecurityTokenGenerator securityTokenGenerator;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) throws UserAlreadyExistsException {
        return new ResponseEntity<>(userService.addUser(user), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    @HystrixCommand(fallbackMethod = "fallbackLoginCheck", commandProperties = {
            @HystrixProperty(name = "execution.isolation.thread.timeoutInMilliseconds", value = "5000")
    })
    public ResponseEntity<?> loginCheck(@RequestBody User user) throws UserNotFoundException{
        User result = userService.login(user.getEmail(), user.getPassword());
        if (result != null) {
            Map<String, String> key = securityTokenGenerator.generateToken(result);
            return new ResponseEntity<>(key,HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Authentication failed", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/removeacc/{emailId}")
    public ResponseEntity<?> removeUserAccount(@PathVariable String emailId) throws UserNotFoundException {
        return new ResponseEntity<>(userService.removeUser(emailId),HttpStatus.OK);
    }

    public ResponseEntity<?> fallbackLoginCheck(@RequestBody User user) {
        return new ResponseEntity<>("Service is Busy.Please Try Agian",HttpStatus.OK);
    }

}
