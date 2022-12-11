package com.niit.UserAuth.service;

import com.niit.UserAuth.Exception.UserAlreadyExistsException;
import com.niit.UserAuth.Exception.UserNotFoundException;
import com.niit.UserAuth.model.User;
import com.niit.UserAuth.rabbitMQ.EmailDetails;
import com.niit.UserAuth.rabbitMQ.Producer;
import com.niit.UserAuth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    UserRepository userRepository;

    //@Autowired
    //EmailService emailService;

    @Autowired
    Producer producer;

    @Override
    public User addUser(User user) throws UserAlreadyExistsException {
        if(userRepository.findById(user.getEmail()).isPresent()){
            throw new UserAlreadyExistsException();
        }
        else {

            User user1 = userRepository.save(user);
            EmailDetails emailDetails = new EmailDetails();
            emailDetails.setRecipient(user.getEmail());
            emailDetails.setSubject("😍🎬 Thanks for joining Movies Flix 😍🎥");
            emailDetails.setMsgBody("We're 😊 always adding movies for you to enjoy 🎥😍 . Drama," +
                    " Comedy, Documentaries, and more -- there's something for everyone. " +
                    "Catch up on full seasons of hit TV shows.");
            producer.sendDTOtoQueue(emailDetails);
            return user1;
        }
    }

    @Override
    public User login(String userEmail, String passwd) throws UserNotFoundException{
        if(userRepository.findById(userEmail).isPresent()){
            User user = userRepository.findById(userEmail).get();
            if(user.getPassword().equals(passwd)){
                user.setPassword("");
                EmailDetails emailDetails=new EmailDetails();
                emailDetails.setRecipient(user.getEmail());
                emailDetails.setSubject("WELCOME 😊😍 "+userEmail);
                emailDetails.setMsgBody("You have successfully Logged in to Movies Flix. You are ready to start enjoying movies 🎥 🎬 😍");
                producer.sendDTOtoQueue(emailDetails);
                return user;
            }
            else{
                return null;
            }
        }
        else{
            return null;
        }
    }

    @Override
    public boolean removeUser(String emailId) throws UserNotFoundException {
        boolean status=false;
        if(userRepository.findById(emailId).isEmpty()){
            status=false;
        }
        else
        {
            userRepository.deleteById(emailId);
            status=true;
        }
        return status;
    }
}
