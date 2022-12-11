package com.niit.UserMovieService.proxy;

import com.niit.UserMovieService.model.UserDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "auth-service",url="localhost:8082")
public interface UserProxy {

    @PostMapping("/app/auth/register")
    public ResponseEntity<?> sendUserObjToAuthApp(@RequestBody UserDTO userDTO);

    @DeleteMapping("/app/auth/removeacc/{emailId}")
    public ResponseEntity<?> deleteAccOfUser(@PathVariable String emailId);
}
