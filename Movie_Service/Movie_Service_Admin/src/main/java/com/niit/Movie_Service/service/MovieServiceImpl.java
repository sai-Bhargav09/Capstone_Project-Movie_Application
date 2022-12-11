package com.niit.Movie_Service.service;

import com.niit.Movie_Service.domain.Movie;
import com.niit.Movie_Service.exception.MovieIdAlreadyExistingException;
import com.niit.Movie_Service.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieServiceImpl implements MovieService{

    private MovieRepository movieRepository;

    @Autowired
    public MovieServiceImpl(MovieRepository movieRepository){
        this.movieRepository=movieRepository;
    }

    @Override
    public Movie saveMovie(Movie movie) throws MovieIdAlreadyExistingException {
        if(movieRepository.findById(movie.getMovieId()).isPresent()){
            throw new MovieIdAlreadyExistingException();
        }
        else{
            return movieRepository.save(movie);
        }
    }

    @Override
    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    @Override
    public Movie updateMovie(int movieId, Movie movie) {
        if(movieRepository.findById(movieId).isPresent()){
            Movie movieObj = movieRepository.findById(movieId).get();
            movieObj.setMovieName(movie.getMovieName());
            movieObj.setGenre(movie.getGenre());
            movieObj.setRating(movie.getRating());
            return movieRepository.save(movieObj);
        }
        else{
            System.out.println("movie id is invalid");
            return null;
        }
    }

    @Override
    public Movie deleteMovie(int movieId) {
        boolean movieExist = false;
        if(movieRepository.findById(movieId).isPresent()){
            Movie movie = movieRepository.findById(movieId).get();
            movieRepository.deleteById(movieId);
            return movie;
        }
        else{
            System.out.println("movie id is not present");
            return null;
        }
    }
}
