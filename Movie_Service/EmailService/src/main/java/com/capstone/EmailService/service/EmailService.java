package com.capstone.EmailService.service;


import com.capstone.EmailService.domain.EmailDetails;

public interface EmailService {

    public String sendEmail(EmailDetails emailDetails);

    public String sendMailWithAttachments(EmailDetails details);

}
