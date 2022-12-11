package com.niit.UserMovieService;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.niit.UserMovieService.controller.UserMovieController;
import com.niit.UserMovieService.model.Movie;
import com.niit.UserMovieService.model.User;
import com.niit.UserMovieService.service.UserMovieServiceImpl;
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
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
public class UserMovieControllerTest {

    @Mock
    private UserMovieServiceImpl userMovieService;
    @InjectMocks
    private UserMovieController userMovieController;

    User user;
    Movie movie;

    @Autowired
    private MockMvc mockMvc;

    @BeforeEach
    public void setUp(){
        movie = new Movie(25,14523,"Gravity","02:05:45","thumbnail","SciFi","sourceUrl","description",4.5);
        user = new User("user@gmail.com","user","454512",45678913,"08/05/1999",1,null,null);
        mockMvc = MockMvcBuilders.standaloneSetup(userMovieController).build();
    }

    @AfterEach
    public void clear(){
        user=null;
        movie=null;
    }

    @Test
    public void productDataToSaveSuccessfully() throws Exception {
        when(userMovieService.saveUserMovie(movie,user.getEmail())).thenReturn(user);
        mockMvc.perform(
                        MockMvcRequestBuilders.post("/app/movie/add/user@gmail.com").
                                contentType(MediaType.APPLICATION_JSON).
                                content(convertToJson(movie))).
                andExpect(status().isCreated()).
                andDo(MockMvcResultHandlers.print());
    }

    public static String convertToJson(final Object obj) throws JsonProcessingException {
        String result="";

        ObjectMapper mapper = new ObjectMapper();
        result=mapper.writeValueAsString(obj);
        return result;
    }
}
