package com.niit.UserMovieService.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document
@NoArgsConstructor //no argument constructor
@AllArgsConstructor //non parameterized constructor
@Data //getter-setter-toString
@EqualsAndHashCode
public class User {

    @Id
    private String email;
    private String userName;
    private String password;
    private long phoneNo;
    private String dateOfBirth;
    private int userImage;
    private List<Movie> movieList;
    private List<ReportedMovie> reportedMovieList;
}
