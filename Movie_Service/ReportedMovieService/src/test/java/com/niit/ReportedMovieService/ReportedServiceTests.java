package com.niit.ReportedMovieService;

import com.niit.ReportedMovieService.domain.ReportedMovie;
import com.niit.ReportedMovieService.repository.ReportedMovieRepository;
import com.niit.ReportedMovieService.service.ReportedMovieServiceImpl;
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

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.times;

@ExtendWith(MockitoExtension.class)
public class ReportedServiceTests {

    @Mock
    private ReportedMovieRepository reportedMovieRepository;

    @InjectMocks
    private ReportedMovieServiceImpl reportedMovieService;

    private ReportedMovie reportedMovie;

    @BeforeEach
    public void setup(){
        reportedMovie=new ReportedMovie(2);
    }

    @AfterEach
    public  void clean(){
        reportedMovie=null;
    }

    @Test
    public void addMovieSuccess() {
        List<ReportedMovie> movies=new ArrayList<>();
        when(reportedMovieRepository.findAll()).thenReturn(movies);
        when(reportedMovieRepository.insert(reportedMovie)).thenReturn(reportedMovie);
        assertEquals(reportedMovie,reportedMovieService.SaveReportedMovies(reportedMovie.get_id()));
        verify(reportedMovieRepository,times(1)).findAll();
        verify(reportedMovieRepository,times(1)).insert(reportedMovie);
    }

    @Test
    public void addMovieFailure(){
        List<ReportedMovie> movies=new ArrayList<>();
        when(reportedMovieRepository.findAll()).thenReturn(movies);
        assertNull(reportedMovieService.SaveReportedMovies(reportedMovie.get_id()));
        verify(reportedMovieRepository,times(1)).findAll();
    }

    @Test
    public void deleteReportedMovieSuccess(){
        List<ReportedMovie> movies=new ArrayList<>();
        when(reportedMovieRepository.findAll()).thenReturn(movies);
        assertTrue(reportedMovieService.removeReportedMovies());
        verify(reportedMovieRepository,times(1)).findAll();
    }

    @Test
    public void getAllReportedMovies(){
        List<ReportedMovie> movies=new ArrayList<>();
        when(reportedMovieRepository.findAll()).thenReturn(movies);
        assertEquals(movies,reportedMovieService.getAllReportedMovieId());
        verify(reportedMovieRepository,times(1)).findAll();
    }
}
