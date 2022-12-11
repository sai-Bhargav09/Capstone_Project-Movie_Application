package com.niit.ReportedMovieService.controller;

import com.niit.ReportedMovieService.domain.ReportedMovie;
import com.niit.ReportedMovieService.service.ReportedMovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//@CrossOrigin("*")//Handling CORS exception
@RestController
@RequestMapping("/appli")
public class ReportedMoviesController {

    private ReportedMovieService reportedMovieService;
    private ResponseEntity<?> responseEntity;

    @Autowired
    public ReportedMoviesController(ReportedMovieService reportedMovieService){
        this.reportedMovieService=reportedMovieService;
    }

    @PostMapping("/report/add")
    public ResponseEntity<?> saveUserMovie(@RequestBody ReportedMovie reportedMovie){
        try
        {
            responseEntity = new ResponseEntity<>(reportedMovieService.SaveReportedMovies(reportedMovie),HttpStatus.OK);
        }
        catch (Exception e)
        {
            System.out.println(e);
        }
        return responseEntity;
    }

    @GetMapping("/report/get")
    public ResponseEntity<?> getAllReportedMovieId(){
        try
        {
            responseEntity = new ResponseEntity<>(reportedMovieService.getAllReportedMovieId(),HttpStatus.OK);
        }
        catch (Exception e)
        {
            System.out.println(e);
        }
        return responseEntity;
    }

    @PostMapping("/report/remove")
    public ResponseEntity<?> saveUserMovie(){
        try
        {
            responseEntity = new ResponseEntity<>(reportedMovieService.removeReportedMovies(),HttpStatus.OK);
        }
        catch (Exception e)
        {
            System.out.println(e);
        }
        return responseEntity;
    }


}
