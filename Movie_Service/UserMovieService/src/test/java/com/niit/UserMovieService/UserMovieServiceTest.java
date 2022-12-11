package com.niit.UserMovieService;

import com.niit.UserMovieService.exception.MovieNotFoundException;
import com.niit.UserMovieService.exception.UnregisteredUserException;
import com.niit.UserMovieService.model.CommonUser;
import com.niit.UserMovieService.model.Movie;
import com.niit.UserMovieService.model.User;
import com.niit.UserMovieService.repository.UserMovieRepository;
import com.niit.UserMovieService.service.UserMovieServiceImpl;
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
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserMovieServiceTest {

    @Mock
    UserMovieRepository userMovieRepository;

    @InjectMocks
    UserMovieServiceImpl userMovieService;

    private User user;
    private Movie movie;
    private CommonUser commonUser;

    @BeforeEach
    public void setUp(){
        movie=new Movie(5,5541,"RDR","2:10:15","thumbnail","Drama","sourceUrl","description",8.6);
        List<Movie> movieList = new ArrayList<>();
        movieList.add(movie);
        user=new User("user3@gmail.com","user2","123456",789456132,"14/07/1999",1,movieList,null);
        commonUser = new CommonUser("user3@gmail.com","user2","123456",789456132,"14/07/1999",1,movieList,null);
    }



    @AfterEach
    public void clear(){
        movie=null;
        user=null;
    }

    @Test
    public void deleteUserMovie() throws UnregisteredUserException, MovieNotFoundException {
        userMovieRepository.save(user);
        when(userMovieRepository.findById(user.getEmail())).thenReturn(Optional.ofNullable(user));
        boolean flag = userMovieService.deleteMovieOfUser(user.getEmail(),movie.getMovieId());
        assertEquals(true,flag);
    }
}
