package com.niit.ReportedMovieService.repository;

import com.niit.ReportedMovieService.domain.ReportedMovie;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ReportedMovieRepository extends MongoRepository<ReportedMovie,Integer> {
}
