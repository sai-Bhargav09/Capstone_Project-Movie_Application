package com.niit.UserMovieService.repository;

import com.niit.UserMovieService.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestBody;

public interface UserMovieRepository extends MongoRepository<User,String> {

}
