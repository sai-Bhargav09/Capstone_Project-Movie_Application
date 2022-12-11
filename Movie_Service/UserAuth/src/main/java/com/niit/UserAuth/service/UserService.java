package com.niit.UserAuth.service;

import com.niit.UserAuth.Exception.UserAlreadyExistsException;
import com.niit.UserAuth.Exception.UserNotFoundException;
import com.niit.UserAuth.model.User;

public interface UserService {
    public User addUser(User user) throws UserAlreadyExistsException;
    public User login(String userEmail, String passwd) throws UserNotFoundException;
    public boolean removeUser(String emailId) throws UserNotFoundException;
}
