package com.niit.Movie_Service;

import com.niit.Movie_Service.domain.Movie;
import com.niit.Movie_Service.exception.MovieIdAlreadyExistingException;
import com.niit.Movie_Service.repository.MovieRepository;
import com.niit.Movie_Service.service.MovieServiceImpl;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class MovieServiceTests {

    @Mock
    private MovieRepository movieRepository;

    @InjectMocks
    private MovieServiceImpl movieService;

    private Movie movie;

    @BeforeEach
    public void setup(){
        movie=new Movie(52,1,"Avatar 2","03:10:00","1AAAyarhiOYt","Adventure","https://www.youtube.com/embed/5PSNL1qE6VY",
                "James Cameron Movie",8.5);
    }

    @AfterEach
    public  void clean(){
        movie=null;
    }

    @Test
    public void addMovieSuccess() throws MovieIdAlreadyExistingException {
        when(movieRepository.findById(movie.getMovieId())).thenReturn(Optional.ofNullable(null));
        when(movieRepository.save(movie)).thenReturn(movie);
        assertEquals(movie,movieService.saveMovie(movie));
        verify(movieRepository,times(1)).findById(movie.getMovieId());
        verify(movieRepository,times(1)).save(movie);
    }

    @Test
    public void addMovieFailure() throws MovieIdAlreadyExistingException {
        when(movieRepository.findById(movie.getMovieId())).thenReturn(Optional.ofNullable(movie));
        assertThrows(MovieIdAlreadyExistingException.class,()->movieService.saveMovie(movie));
        verify(movieRepository,times(1)).findById(movie.getMovieId());
        verify(movieRepository,times(0)).insert(movie);
    }


    @Test
    public void deleteMovieSuccess(){
        when(movieRepository.findById(movie.getMovieId())).thenReturn(Optional.ofNullable(movie));
        Movie movie1=movieService.deleteMovie(movie.getMovieId());
        assertEquals(movie,movie1);
        verify(movieRepository,times(2)).findById(movie.getMovieId());
        verify(movieRepository,times(1)).deleteById(movie.getMovieId());
    }

    @Test
    public void deleteMessageFailure(){
        when(movieRepository.findById(movie.getMovieId())).thenReturn(Optional.ofNullable(null));
        assertEquals(null,movieService.deleteMovie(movie.getMovieId()));
        verify(movieRepository,times(1)).findById(movie.getMovieId());
    }

    @Test
    public void getAllMovies(){
        List<Movie> movieList=new ArrayList<>();
        when(movieRepository.findAll()).thenReturn(movieList);
        assertEquals(movieList,movieService.getAllMovies());
        verify(movieRepository,times(1)).findAll();
    }


}
