package com.niit.UserMovieService.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommonUser {

    private String email;
    private String userName;
    private String password;
    private long phoneNo;
    private String dateOfBirth;
    private int userImage;
    private List<Movie> movieList;
    private List<ReportedMovie> reportedMovieList;

}
