package com.niit.UserAuth;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.niit.UserAuth.Exception.UserAlreadyExistsException;
import com.niit.UserAuth.Exception.UserNotFoundException;
import com.niit.UserAuth.controller.UserController;
import com.niit.UserAuth.model.User;
import com.niit.UserAuth.security.SecurityTokenGenerator;
import com.niit.UserAuth.service.UserService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
public class UserControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @Mock
    private UserService userService;

    @Mock
    private SecurityTokenGenerator securityTokenGenerator;

    @InjectMocks
    private UserController userController;

    private User user;

    @BeforeEach
    public void setup(){
        user=new User("abc@gmail.com","abc","abc123","Role_User",2);
        mockMvc= MockMvcBuilders.standaloneSetup(userController).build();
    }

    @AfterEach
    public void clean(){
        user=null;
    }

    private static String convertToJson(Object obj){
        String result="";

        try{
            ObjectMapper mapper=new ObjectMapper();
            result=mapper.writeValueAsString(obj);
        }
        catch (Exception ex){
            ex.printStackTrace();
        }
        return result;
    }

    @Test
    public void addUserSuccess() throws Exception {
        when(userService.addUser(user)).thenReturn(user);

        mockMvc.perform(
                        post("/app/auth/register").contentType(MediaType.APPLICATION_JSON).content(convertToJson(user)))
                .andExpect(status().isCreated()).andDo(MockMvcResultHandlers.print());

        verify(userService,times(1)).addUser(user);
    }

    @Test
    public void addUserFailure() throws Exception{
        when(userService.addUser(user)).thenThrow(UserAlreadyExistsException.class);

        mockMvc.perform(
                        post("/app/auth/register").contentType(MediaType.APPLICATION_JSON).content(convertToJson(user)))
                .andExpect(status().isConflict()).andDo(MockMvcResultHandlers.print());

        verify(userService,times(1)).addUser(user);

    }

    @Test
    public void loginSuccess() throws Exception{
        when(userService.login(user.getEmail(),user.getPassword())).thenReturn(user);
        mockMvc.perform(
                        post("/app/auth/login").contentType(MediaType.APPLICATION_JSON).content(convertToJson(user)))
                .andExpect(status().isOk()).andDo(MockMvcResultHandlers.print());
        verify(userService,times(1)).login(user.getEmail(),user.getPassword());
    }

    @Test
    public void loginFailure() throws Exception{
        when(userService.login(user.getEmail(),user.getPassword())).thenThrow(UserNotFoundException.class);

        mockMvc.perform(
                        post("/app/auth/login").contentType(MediaType.APPLICATION_JSON).content(convertToJson(user)))
                .andExpect(status().isNotFound()).andDo(MockMvcResultHandlers.print());

        verify(userService,times(1)).login(user.getEmail(),user.getPassword());
    }


}
