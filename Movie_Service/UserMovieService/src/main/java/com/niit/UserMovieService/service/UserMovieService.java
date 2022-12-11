package com.niit.UserMovieService.service;

import com.niit.UserMovieService.exception.MovieNotFoundException;
import com.niit.UserMovieService.exception.UnregisteredUserException;
import com.niit.UserMovieService.exception.UserAlreadyRegisteredException;
import com.niit.UserMovieService.model.CommonUser;
import com.niit.UserMovieService.model.Movie;
import com.niit.UserMovieService.model.ReportedMovie;
import com.niit.UserMovieService.model.User;
import org.springframework.stereotype.Service;

import java.util.List;

public interface UserMovieService {

    User registerNewUserFeign(CommonUser commonUser) throws UserAlreadyRegisteredException;

    User saveUserMovie(Movie movie, String emailId) throws MovieNotFoundException, UnregisteredUserException;

    boolean deleteMovieOfUser(String emailId, int movieId) throws MovieNotFoundException, UnregisteredUserException;

    List<Movie> getAllMovieOfUser(String emailId) throws UnregisteredUserException;

    boolean deleteUser(String emailId) throws UnregisteredUserException;

    User addReportedMovie(ReportedMovie reportedMovie, String emailId) throws MovieNotFoundException, UnregisteredUserException;

    boolean removeReportedMovie(String emailId, int repMovieId) throws MovieNotFoundException, UnregisteredUserException;

    List<ReportedMovie> getAllReportedMovies(String emailId) throws UnregisteredUserException;

    String sendFeedback(String message);
}
