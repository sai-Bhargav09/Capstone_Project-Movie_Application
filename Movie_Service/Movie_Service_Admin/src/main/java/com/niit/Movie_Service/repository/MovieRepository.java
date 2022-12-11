package com.niit.Movie_Service.repository;

import com.niit.Movie_Service.domain.Movie;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MovieRepository extends MongoRepository<Movie,Integer> {
}
