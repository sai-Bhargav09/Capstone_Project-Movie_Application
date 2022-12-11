package com.niit.UserMovieService.controller;

import com.niit.UserMovieService.exception.UnregisteredUserException;
import com.niit.UserMovieService.model.CommonUser;
import com.niit.UserMovieService.model.Movie;
import com.niit.UserMovieService.model.ReportedMovie;
import com.niit.UserMovieService.service.UserMovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/app")
public class UserMovieController {

    private UserMovieService userMovieService;
    private ResponseEntity<?> responseEntity;

    @Autowired
    public UserMovieController(UserMovieService userMovieService){
        this.userMovieService=userMovieService;
    }

    @GetMapping("/movie/get/{email}")
    public ResponseEntity<?> getAllMoviesOfUser(@PathVariable String email){
        try{
            responseEntity = new ResponseEntity<>(userMovieService.getAllMovieOfUser(email), HttpStatus.OK);
        }
        catch(Exception e)
        {
            System.out.println(e);
        }
        return responseEntity;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerNewUserFeign(@RequestBody CommonUser commonUser){
        try {
            responseEntity =  new ResponseEntity<>(userMovieService.registerNewUserFeign(commonUser), HttpStatus.CREATED);
        }
        catch(Exception e)
        {
            System.out.println(e);
        }
        return responseEntity;
    }

    @PostMapping("/movie/add/{email}")
    public ResponseEntity<?> saveUserMovie(@RequestBody Movie movie, @PathVariable String email){
        try {
            responseEntity = new ResponseEntity<>(userMovieService.saveUserMovie(movie, email), HttpStatus.CREATED);
        }
        catch (Exception e)
        {
            System.out.println(e);
        }
        return responseEntity;
    }

    @DeleteMapping("/movie/remove/{email}/{movieId}")
    public ResponseEntity<?> deleteUserMovie(@PathVariable String email,@PathVariable int movieId)
    {
        try
        {
            responseEntity = new ResponseEntity<>(userMovieService.deleteMovieOfUser(email, movieId), HttpStatus.OK);
        }
        catch (Exception e)
        {
            System.out.println(e);
        }
        return responseEntity;
    }

    @DeleteMapping("/movie/removeacc/{email}")
    public ResponseEntity<?> deleteUser(@PathVariable String email) throws UnregisteredUserException {
        try
        {
            responseEntity =  new ResponseEntity<>(userMovieService.deleteUser(email),HttpStatus.OK);
        }
        catch (Exception e)
        {
            System.out.println(e);
        }
        return responseEntity;
    }

    @PostMapping("/movie/reportadd/{email}")
    public ResponseEntity<?> saveReportedMovie(@RequestBody ReportedMovie repMovie, @PathVariable String email){
        try {
            responseEntity = new ResponseEntity<>(userMovieService.addReportedMovie(repMovie,email), HttpStatus.CREATED);
        }
        catch (Exception e)
        {
            System.out.println(e);
        }
        return responseEntity;
    }

    @DeleteMapping("/movie/reportrem/{email}/{repMovieId}")
    public ResponseEntity<?> removeReportedMovie(@PathVariable String email,@PathVariable int repMovieId)
    {
        try
        {
            responseEntity = new ResponseEntity<>(userMovieService.removeReportedMovie(email, repMovieId), HttpStatus.OK);
        }
        catch (Exception e)
        {
            System.out.println(e);
        }
        return responseEntity;
    }

    @GetMapping("/movie/reportget/{email}")
    public ResponseEntity<?> getAllReportedMovies(@PathVariable String email){
        try{
            responseEntity = new ResponseEntity<>(userMovieService.getAllReportedMovies(email), HttpStatus.OK);
        }
        catch(Exception e)
        {
            System.out.println(e);
        }
        return responseEntity;
    }

    @PostMapping("/movie/feedback/{message}")
    public ResponseEntity<?> feedBack(@PathVariable String message ){
        return new ResponseEntity<>(userMovieService.sendFeedback(message),HttpStatus.OK);
    }
}
