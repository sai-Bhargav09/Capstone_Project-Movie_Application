package com.niit.Movie_Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.niit.Movie_Service.controller.MovieController;
import com.niit.Movie_Service.domain.Movie;

import com.niit.Movie_Service.exception.MovieIdAlreadyExistingException;
import com.niit.Movie_Service.exception.MovieIdNotFoundException;
import com.niit.Movie_Service.service.MovieService;
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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
public class MovieControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @Mock
    private MovieService movieService;

    @InjectMocks
    private MovieController movieController;

    private Movie movie;

    @BeforeEach
    public void setup(){
        movie=new Movie(52,0,"Avatar 2","03:10:00","1AAAyarhiOYt","Adventure","https://www.youtube.com/embed/5PSNL1qE6VY",
                "James Cameron Movie",8.5);

        mockMvc= MockMvcBuilders.standaloneSetup(movieController).build();
    }

    @AfterEach
    public void clean(){
        movie=null;
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
    public void addMovieSuccess() throws Exception {
        when(movieService.saveMovie(movie)).thenReturn(movie);

        mockMvc.perform(
                        post("/app/movie/add").contentType(MediaType.APPLICATION_JSON).content(convertToJson(movie)))
                .andExpect(status().isOk()).andDo(MockMvcResultHandlers.print());

        verify(movieService,times(1)).saveMovie(movie);
    }

    @Test
    public void addMovieFailure() throws Exception {
        when(movieService.saveMovie(movie)).thenThrow(MovieIdAlreadyExistingException.class);

        mockMvc.perform(
                        post("/app/movie/add").contentType(MediaType.APPLICATION_JSON).content(convertToJson(movie)))
                .andExpect(status().isConflict()).andDo(MockMvcResultHandlers.print());

        verify(movieService,times(1)).saveMovie(movie);
    }

    @Test
    public void deleteMovieSuccess() throws Exception {
        when(movieService.deleteMovie(movie.getMovieId())).thenReturn(movie);

        mockMvc.perform(delete("/app/movie/remove/{movieId}",52)).andExpect(status().isOk()).andDo(MockMvcResultHandlers.print());
        verify(movieService,times(1)).deleteMovie(movie.getMovieId());
    }

    @Test
    public void deleteMovieFailure() throws Exception {
        when(movieService.deleteMovie(movie.getMovieId())).thenThrow(MovieIdNotFoundException.class);

        mockMvc.perform(delete("/app/movie/remove/{movieId}",52)).andExpect(status().isConflict()).andDo(MockMvcResultHandlers.print());
        verify(movieService,times(1)).deleteMovie(movie.getMovieId());
    }







}
