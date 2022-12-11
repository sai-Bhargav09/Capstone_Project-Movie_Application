package com.niit.Movie_Service.service;

import com.niit.Movie_Service.domain.Movie;
import com.niit.Movie_Service.exception.MovieIdAlreadyExistingException;
import com.niit.Movie_Service.exception.MovieIdNotFoundException;

import java.util.List;

public interface MovieService {

    //adding new movie
    Movie saveMovie(Movie movie) throws MovieIdAlreadyExistingException;

    //get all movies
    List<Movie> getAllMovies();

    //update movie details
    Movie updateMovie(int movieId, Movie movie) throws MovieIdNotFoundException;

    //delete movie
    Movie deleteMovie(int movieId) throws MovieIdNotFoundException;

}
