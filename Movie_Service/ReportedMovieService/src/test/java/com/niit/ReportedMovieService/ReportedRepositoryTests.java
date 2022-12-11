package com.niit.ReportedMovieService;

import com.niit.ReportedMovieService.domain.ReportedMovie;
import com.niit.ReportedMovieService.repository.ReportedMovieRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DataMongoTest
@ExtendWith(SpringExtension.class)
public class ReportedRepositoryTests {

    @Autowired
    private ReportedMovieRepository reportedMovieRepository;

    private ReportedMovie reportedMovie;

    @BeforeEach
    public void setup(){
        reportedMovie =new ReportedMovie(1);
    }

    @AfterEach
    public void clean(){
        reportedMovie=null;
        reportedMovieRepository.deleteById(1);
    }

    @Test
    public void getReportedMovie(){
        reportedMovieRepository.insert(reportedMovie);
        ReportedMovie movie=reportedMovieRepository.findById(reportedMovie.get_id()).get();
        assertEquals(movie,reportedMovie);
    }


    @Test
    public void ReportedMovieToDelete(){
        reportedMovieRepository.insert(reportedMovie);
        reportedMovieRepository.deleteById(reportedMovie.get_id());
        assertEquals(Optional.empty(),reportedMovieRepository.findById(reportedMovie.get_id()));
    }



}
