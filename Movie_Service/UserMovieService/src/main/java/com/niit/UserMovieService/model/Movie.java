package com.niit.UserMovieService.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@NoArgsConstructor //no argument constructor
@AllArgsConstructor //non parameterized constructor
@Data //getter-setter-toString
@EqualsAndHashCode
public class Movie {

    private int movieId;
    private int tmdbId;
    private String movieName;
    private String duration;
    private String thumbnail;
    private String genre;
    private String sourceUrl;
    private String description;
    private double rating;

}
