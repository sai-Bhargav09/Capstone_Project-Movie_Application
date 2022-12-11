package com.niit.ReportedMovieService.service;

import com.niit.ReportedMovieService.domain.ReportedMovie;

import java.util.List;

public interface ReportedMovieService {

    ReportedMovie SaveReportedMovies(ReportedMovie reportedMovie);

    boolean removeReportedMovies();

    List<ReportedMovie> getAllReportedMovieId();
}
