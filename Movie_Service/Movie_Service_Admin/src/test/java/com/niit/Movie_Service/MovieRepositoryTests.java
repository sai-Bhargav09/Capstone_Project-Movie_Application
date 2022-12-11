package com.niit.Movie_Service;

import com.niit.Movie_Service.domain.Movie;
import com.niit.Movie_Service.repository.MovieRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DataMongoTest
@ExtendWith(SpringExtension.class)
public class MovieRepositoryTests {

    @Autowired
    private MovieRepository movieRepository;

    private Movie movie;

    @BeforeEach
    public void setup(){
        movie=new Movie(51,0,"Avatar 2","03:10:00","1AAAyarhiOYt","Adventure","https://www.youtube.com/embed/5PSNL1qE6VY",
                "James Cameron Movie",8.5);
    }
    @AfterEach
    public void clean(){
        movie=null;
        movieRepository.deleteById(51);
    }

    @Test
    public void getAllMovies(){
        movieRepository.insert(movie);
        List<Movie> movieList=movieRepository.findAll();
        assertEquals(51,movieList.size());
    }

    @Test
    public void getSavedMovie(){
        movieRepository.insert(movie);
        Movie result=movieRepository.findById(movie.getMovieId()).get();
        assertEquals(result,movie);
    }

    @Test
    public void givenMovieToDelete(){
        movieRepository.insert(movie);
        movieRepository.deleteById(movie.getMovieId());
        assertEquals(Optional.empty(),movieRepository.findById(movie.getMovieId()));
    }
}
