package com.niit.Movie_Service.controller;

import com.niit.Movie_Service.domain.Movie;
import com.niit.Movie_Service.exception.MovieIdAlreadyExistingException;
import com.niit.Movie_Service.exception.MovieIdNotFoundException;
import com.niit.Movie_Service.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/appl")
public class MovieController {

    private MovieService movieService;

    @Autowired
    public MovieController(MovieService movieService){
        this.movieService=movieService;
    }

    @GetMapping("/get")
    public ResponseEntity<?> getAllMovies(){
        return new ResponseEntity<>(movieService.getAllMovies(), HttpStatus.OK);
    }

    @PostMapping("/movie/add")
    public ResponseEntity<?> saveMovie(@RequestBody Movie movie) throws MovieIdAlreadyExistingException {
        return new ResponseEntity<>(movieService.saveMovie(movie), HttpStatus.OK);
    }

    @PostMapping("/movie/update/{movieId}")
    public ResponseEntity<?> updateMovie(@PathVariable int movieId, @RequestBody Movie movie) throws MovieIdNotFoundException {
        return new ResponseEntity<>(movieService.updateMovie(movieId,movie),HttpStatus.OK);
    }

    @DeleteMapping("/movie/remove/{movieId}")
    public ResponseEntity<?> removeMovie(@PathVariable int movieId) throws MovieIdNotFoundException {
        return new ResponseEntity<>(movieService.deleteMovie(movieId), HttpStatus.OK);
    }
}
