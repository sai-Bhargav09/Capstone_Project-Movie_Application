package com.niit.UserMovieService.service;

import com.niit.UserMovieService.exception.MovieNotFoundException;
import com.niit.UserMovieService.exception.UnregisteredUserException;
import com.niit.UserMovieService.exception.UserAlreadyRegisteredException;
import com.niit.UserMovieService.model.*;
import com.niit.UserMovieService.proxy.ReportedProxy;
import com.niit.UserMovieService.proxy.UserProxy;
import com.niit.UserMovieService.rabbitMQ.EmailDetails;
import com.niit.UserMovieService.rabbitMQ.Producer;
import com.niit.UserMovieService.repository.UserMovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class UserMovieServiceImpl implements UserMovieService {

    private UserMovieRepository userMovieRepository;

    @Autowired
    private UserProxy userProxy;

    @Autowired
    private Producer producer;

    @Autowired
    private ReportedProxy reportedProxy;

    @Autowired
    @Lazy
    public UserMovieServiceImpl(UserMovieRepository userMovieRepository){
        this.userMovieRepository=userMovieRepository;
    }

    @Override
    public User registerNewUserFeign(CommonUser commonUser) throws UserAlreadyRegisteredException {
        if(userMovieRepository.findById(commonUser.getEmail()).isPresent()){
            throw new UserAlreadyRegisteredException();
        }
        else {
            UserDTO userDTO = new UserDTO();
            userDTO.setEmail(commonUser.getEmail());
            userDTO.setPassword(commonUser.getPassword());
            userDTO.setRole("ROLE_USER");
            userDTO.setUserImage(commonUser.getUserImage());
            userDTO.setUserName(commonUser.getUserName());
            ResponseEntity<?> dtoData = userProxy.sendUserObjToAuthApp(userDTO);

            System.out.println("DATA SENT : " + dtoData);

            User user = new User(commonUser.getEmail(), commonUser.getUserName(),
                    commonUser.getPassword(), commonUser.getPhoneNo(), commonUser.getDateOfBirth(), commonUser.getUserImage(),commonUser.getMovieList(),commonUser.getReportedMovieList());
            return userMovieRepository.insert(user);
        }
    }

    @Override
    public User saveUserMovie(Movie movie, String emailId) throws UnregisteredUserException {
        //checking customer by id ,authentication check
        if (userMovieRepository.findById(emailId).isEmpty()) {
            throw new UnregisteredUserException();
        }
        // user is authorized and getting customer object from customer id
        User userObj = userMovieRepository.findById(emailId).get();
        //null describes 0 product
        if (userObj == null) {
            userObj.setMovieList(Arrays.asList(movie));
        } else {
            //create a list of product and adding product object
            List<Movie> movieList = userObj.getMovieList();
            movieList.add(movie);
            userObj.setMovieList(movieList);
            EmailDetails emailDetails=new EmailDetails();
            emailDetails.setRecipient(emailId);
            emailDetails.setSubject("Movie Added into your Collection");
            emailDetails.setMsgBody(movie.toString());
            producer.sendDTOtoQueue(emailDetails);
        }
        return userMovieRepository.save(userObj);
    }

    @Override
    public boolean deleteMovieOfUser(String emailId, int movieId) throws MovieNotFoundException, UnregisteredUserException {
        // created a variable of type boolean
        boolean movieIdExist = false;
        //checking authentication
        if (userMovieRepository.findById(emailId).isEmpty()) {
            throw new UnregisteredUserException();
        }
        //if authenticated, getting customer object using customer id
        User user = userMovieRepository.findById(emailId).get();
        //creating list of product to get product list to verify product id
        List<Movie> movieList = user.getMovieList();
        //java 8 collection, return type boolean
        movieIdExist = movieList.removeIf(i -> i.getMovieId() == (movieId));
        if (!movieIdExist) {
            throw new MovieNotFoundException();
        }
        user.setMovieList(movieList);
        userMovieRepository.save(user);
        return movieIdExist;
    }

    @Override
    public List<Movie> getAllMovieOfUser(String emailId) throws UnregisteredUserException {
        if (userMovieRepository.findById(emailId).isEmpty()) {
            throw new UnregisteredUserException();
        }
        return userMovieRepository.findById(emailId).get().getMovieList();
    }

    @Override
    public boolean deleteUser(String emailId) throws UnregisteredUserException {
        boolean status=false;
        if(userMovieRepository.findById(emailId).isPresent()){
            ResponseEntity<?> dtoData = userProxy.deleteAccOfUser(emailId);
            userMovieRepository.deleteById(emailId);
            status=true;

        }
        else{
            throw new UnregisteredUserException();
        }
        return status;
    }

//    @Override
//    public User addReportedMovie(ReportedMovie reportedMovie, String emailId) throws MovieNotFoundException, UnregisteredUserException {
//        if(userMovieRepository.findById(emailId).isEmpty()) {
//            throw new UnregisteredUserException();
//        }
//        User userObj = userMovieRepository.findById(emailId).get();
//        if (userObj == null) {
//            userObj.setReportedMovieList(Arrays.asList(reportedMovie));
//        } else {
//            List<ReportedMovie> repMovieList = userObj.getReportedMovieList();
//            repMovieList.add(reportedMovie);
//            userObj.setReportedMovieList(repMovieList);
//        }
//        return userMovieRepository.save(userObj);
//    }

    @Override
    public User addReportedMovie(ReportedMovie reportedMovie, String emailId) throws MovieNotFoundException, UnregisteredUserException {
        if(userMovieRepository.findById(emailId).isEmpty()) {
            throw new UnregisteredUserException();
        }
        User userObj = userMovieRepository.findById(emailId).get();
        if (userObj == null) {
            userObj.setReportedMovieList(Arrays.asList(reportedMovie));
        } else {
            List<ReportedMovie> repMovieList = userObj.getReportedMovieList();
            repMovieList.add(reportedMovie);
            userObj.setReportedMovieList(repMovieList);

            String a=userObj.getUserName();
            ReportedDTO reportedDTO=new ReportedDTO();
            reportedDTO.set_id(reportedMovie.getRepMovieId());
            reportedDTO.setEmail(emailId);
            reportedDTO.setUserName(a);
            ResponseEntity<?> result= reportedProxy.sendMovieToReportedService(reportedDTO);

            EmailDetails emailDetails=new EmailDetails();
            emailDetails.setRecipient(emailId);
            emailDetails.setSubject("🎬🎥😣Movie Reported Successfully😥🫣🎬🎥");
            emailDetails.setMsgBody("We are really sorry for the inconvenience, our team is on to look into this matter😊 ");
            producer.sendDTOtoQueue(emailDetails);
            System.out.println(result);

        }
        return userMovieRepository.save(userObj);
    }

    @Override
    public boolean removeReportedMovie(String emailId, int repMovieId) throws MovieNotFoundException, UnregisteredUserException {
        boolean repMovieIdExist = false;
        if (userMovieRepository.findById(emailId).isEmpty()) {
            throw new UnregisteredUserException();
        }
        User user = userMovieRepository.findById(emailId).get();
        List<ReportedMovie> repMovieList = user.getReportedMovieList();
        repMovieIdExist = repMovieList.removeIf(i -> i.getRepMovieId() == (repMovieId));
        if (!repMovieIdExist) {
            throw new MovieNotFoundException();
        }
        user.setReportedMovieList(repMovieList);
        userMovieRepository.save(user);
        return repMovieIdExist;
    }

    @Override
    public List<ReportedMovie> getAllReportedMovies(String emailId) throws UnregisteredUserException {
        if (userMovieRepository.findById(emailId).isEmpty()) {
            throw new UnregisteredUserException();
        }
        return userMovieRepository.findById(emailId).get().getReportedMovieList();
    }

    @Override
    public String sendFeedback(String message) {
        EmailDetails emailDetails=new EmailDetails();
        emailDetails.setRecipient("moviesflix.capstone@gmail.com");
        emailDetails.setSubject("Feedback From User");
        emailDetails.setMsgBody(message);
        producer.sendDTOtoQueue(emailDetails);
        return "Thank you for your feedback";
    }
}
