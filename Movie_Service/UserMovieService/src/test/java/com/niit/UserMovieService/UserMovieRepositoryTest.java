package com.niit.UserMovieService;

import com.niit.UserMovieService.model.CommonUser;
import com.niit.UserMovieService.model.Movie;
import com.niit.UserMovieService.model.User;
import com.niit.UserMovieService.repository.UserMovieRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(SpringExtension.class)
@DataMongoTest

public class UserMovieRepositoryTest {

    @Autowired
    private UserMovieRepository userMovieRepository;
    private User user;
    private Movie movie;
    private CommonUser commonUser;

    @BeforeEach
    public void setUp(){
        movie = new Movie(10,12345,"Titanic","1:45:15",
                "thumbnail","Romantic","sourceUrl","description",5.8);
        List<Movie> movieList = new ArrayList<>();
        movieList.add(movie);
        user = new User("user1@gmail.com","user1","1234",877451268,"15/08/1999",1,movieList,null);
        commonUser = new CommonUser("user1@gmail.com","user1","1234",877451268,"15/08/1999",1,movieList,null);
    }

    @AfterEach
    public void clear(){
        user=null;
        movie=null;
    }

    @Test
    public void givenUserDetails(){
        //insert record
        userMovieRepository.insert(user);

        //get record by id
        User u = userMovieRepository.findById(user.getEmail()).get();
        assertEquals(u.getUserName(),u.getUserName());
        assertEquals(u.getPhoneNo(),u.getPhoneNo());
        //compare values for both object need to override equal method
        assertEquals(user,u);
    }

    @Test
    public void getAllMovies(){
        //userMovieRepository.insert(user);
        List<User>  list=userMovieRepository.findAll();
        assertEquals(3,list.size());
    }

    @Test
    public void givenUserToDelete(){
        //userMovieRepository.insert(user);
        userMovieRepository.deleteById(user.getEmail());
        assertEquals(Optional.empty(),userMovieRepository.findById(user.getEmail()));
    }
}
