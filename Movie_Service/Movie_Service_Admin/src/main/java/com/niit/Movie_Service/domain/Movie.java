package com.niit.Movie_Service.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Generated;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Movie {

    @Id
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
