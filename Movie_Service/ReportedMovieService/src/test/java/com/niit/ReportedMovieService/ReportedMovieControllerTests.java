package com.niit.ReportedMovieService;


import com.niit.ReportedMovieService.controller.ReportedMoviesController;
import com.niit.ReportedMovieService.domain.ReportedMovie;
import com.niit.ReportedMovieService.service.ReportedMovieService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
public class ReportedMovieControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @Mock
    private ReportedMovieService reportedMovieService;

    @InjectMocks
    private ReportedMoviesController reportedMoviesController;

    private ReportedMovie reportedMovie;

    @BeforeEach
    public void setup(){
        reportedMovie=new ReportedMovie(1);
        mockMvc= MockMvcBuilders.standaloneSetup(reportedMoviesController).build();
    }

    @AfterEach
    public void clean(){
        reportedMovie=null;
    }

    @Test
    public void addMovieSuccess() throws Exception {
        when(reportedMovieService.SaveReportedMovies(reportedMovie.get_id())).thenReturn(reportedMovie);

        mockMvc.perform(
                        post("/app/report/add/{repMovieId}",1).contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()).andDo(MockMvcResultHandlers.print());

        verify(reportedMovieService,times(1)).SaveReportedMovies(reportedMovie.get_id());
    }

    @Test
    public void addMovieFailure() throws Exception {
        when(reportedMovieService.SaveReportedMovies(reportedMovie.get_id())).thenReturn(null);

        mockMvc.perform(
                        post("/app/report/add/{repMovieId}",1).contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()).andDo(MockMvcResultHandlers.print());

        verify(reportedMovieService,times(1)).SaveReportedMovies(reportedMovie.get_id());
    }

    @Test
    public void deleteReportedMoviesSuccess() throws Exception{
        when(reportedMovieService.removeReportedMovies()).thenReturn(true);

        mockMvc.perform(
                        post("/app/report/remove"))
                .andExpect(status().isOk()).andDo(MockMvcResultHandlers.print());

        verify(reportedMovieService,times(1)).removeReportedMovies();

    }
}
