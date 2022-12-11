package com.niit.UserAuth;


import com.niit.UserAuth.Exception.UserAlreadyExistsException;
import com.niit.UserAuth.Exception.UserNotFoundException;
import com.niit.UserAuth.model.User;
import com.niit.UserAuth.rabbitMQ.Producer;
import com.niit.UserAuth.repository.UserRepository;
import com.niit.UserAuth.service.UserServiceImpl;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;


@ExtendWith(MockitoExtension.class)
public class UserAuthServiceTests {

    @Mock
    private UserRepository userRepository;

    @Mock
    private Producer producer;

    @InjectMocks
    private UserServiceImpl userService;

    private User user;

    @BeforeEach
    public void setup(){
        user=new User("abc@gmail.com","abc","abc123","Role_User",2);
    }

    @AfterEach
    public void clean(){
        user=null;
    }

    @Test
    public void addUserSuccess() throws UserAlreadyExistsException {
        when(userRepository.save(user)).thenReturn(user);
        assertEquals(user,userService.addUser(user));
        verify(userRepository,times(1)).save(user);
    }

    @Test
    public void addUserFailure() throws UserAlreadyExistsException{
        when(userRepository.findById(user.getEmail())).thenReturn(Optional.ofNullable(user));
        assertThrows(UserAlreadyExistsException.class,()->userService.addUser(user));
        verify(userRepository,times(1)).findById(user.getEmail());

    }

    @Test
    public void loginSuccess() throws UserNotFoundException{
        when(userRepository.findById(user.getEmail())).thenReturn(Optional.ofNullable(user));
        assertEquals(user,userService.login(user.getEmail(),user.getPassword()));
        verify(userRepository,times(2)).findById(user.getEmail());
    }

    @Test
    public void loginfailure() throws UserNotFoundException{
        when(userRepository.findById(user.getEmail())).thenReturn(Optional.ofNullable(null));
        assertThrows(UserNotFoundException.class,()->userService.login(user.getEmail(),user.getPassword()));
        verify(userRepository,times(1)).findById(user.getEmail());
    }



}
