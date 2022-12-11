package com.niit.ReportedMovieService.service;

import com.niit.ReportedMovieService.domain.ReportedMovie;
import com.niit.ReportedMovieService.repository.ReportedMovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class ReportedMovieServiceImpl implements ReportedMovieService {

    private ReportedMovieRepository reportedMovieRepository;



    public ReportedMovieServiceImpl(ReportedMovieRepository reportedMovieRepository){
        this.reportedMovieRepository=reportedMovieRepository;
    }


    @Override
    public ReportedMovie SaveReportedMovies(ReportedMovie reportedMovie) {
        List<ReportedMovie> rmList = reportedMovieRepository.findAll();
        int count=0;
        for(ReportedMovie e: rmList){
            if(e.get_id()==reportedMovie.get_id()){
                count++;
            }
        }
        if(count==0){
            ReportedMovie rm = new ReportedMovie(reportedMovie.get_id(),reportedMovie.getUserName(),reportedMovie.getEmail());
            return reportedMovieRepository.insert(rm);
        }
        else{
            return null;
        }

    }

    @Override
    public boolean removeReportedMovies() {
        boolean deleted=false;
        List<ReportedMovie> rmList = reportedMovieRepository.findAll();
        int n= rmList.size();
        System.out.println(n);
        for(ReportedMovie r:rmList){
            reportedMovieRepository.deleteById(r.get_id());
        }
        return true;
        }


    @Override
    public List<ReportedMovie> getAllReportedMovieId() {
        return reportedMovieRepository.findAll();
    }
}


