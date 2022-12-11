package com.capstone.EmailService.controller;

import com.capstone.EmailService.domain.EmailDetails;
import com.capstone.EmailService.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/email-app/v1")
public class EmailContoller {
    @Autowired
    EmailService emailService;
    //http://localhost:1111/email-app/v1/send
    @PostMapping("/send")
    public ResponseEntity<?> sendEmail(@RequestBody EmailDetails emailDetails){
        return new ResponseEntity<>(emailService.sendEmail(emailDetails), HttpStatus.OK);
    }
}
