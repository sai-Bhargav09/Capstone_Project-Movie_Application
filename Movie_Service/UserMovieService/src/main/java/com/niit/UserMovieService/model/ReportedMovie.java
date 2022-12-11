package com.niit.UserMovieService.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@NoArgsConstructor //no argument constructor
@AllArgsConstructor //non parameterized constructor
@Data //getter-setter-toString
@EqualsAndHashCode
public class ReportedMovie {

    private int repMovieId;
    private int tmdbId;
    private String repMovieName;
    private String repDuration;
    private String repThumbnail;
    private String repGenre;
    private String repSourceUrl;
    private String repDescription;
    private double repRating;
}
