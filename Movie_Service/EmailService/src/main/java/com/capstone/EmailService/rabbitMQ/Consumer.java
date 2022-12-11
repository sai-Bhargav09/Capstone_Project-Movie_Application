package com.capstone.EmailService.rabbitMQ;


import com.capstone.EmailService.domain.EmailDetails;
import com.capstone.EmailService.service.EmailService;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Consumer {
    @Autowired
    private EmailService emailService;

    @RabbitListener(queues="user_queue")
    public void getDTOfromQueueAndAddtoDB(EmailDetails emailDetails){
        emailService.sendEmail(emailDetails);

        System.out.println("\nadded_User " + emailService.sendEmail(emailDetails));
    }

}
