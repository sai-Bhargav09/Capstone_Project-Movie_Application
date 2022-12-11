import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieData } from '../classes/movies';
import { AdminService } from '../Services/admin.service';
import { CommonMethodsService } from '../Services/common-methods.service';
import { SnackbarService } from '../Services/snackbar.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-all-movies',
  templateUrl: './all-movies.component.html',
  styleUrls: ['./all-movies.component.css']
})
export class AllMoviesComponent implements OnInit {

  constructor(private commonService: CommonMethodsService, private adminService: AdminService, private snackbar: SnackbarService, private router: Router) { }

  ngOnInit(): void {
    this.getAllMovies();
  }

  allMoviesData: Array<MovieData> = [];

  getAllMovies() {
    this.allMoviesData = this.commonService.getAllMovies();
  }

  redirectToDashboard() {
    this.router.navigateByUrl("/dashboard");
  }

  addFormVisibility = false;

  addMovieButton() {
    this.addFormVisibility = true;
  }

  addMovie(movieId: any, movieName: any, duration: any, thumbnail: any, genre: any, sourceurl: any, rate: any, desc: any, tmdbId:any) {
    // console.log(movieid, movieName, duration, thumbnail, genre, sourceurl, rate, desc);
    this.addFormVisibility = false;
    this.adminService.addNewMovieInDatabase({
      "movieId": movieId, "movieName": movieName, "duration": duration,
      "thumbnail": thumbnail, "genre": genre, "sourceUrl": sourceurl, "rating": rate, "description": desc,
      "tmdbId": tmdbId}).subscribe(resp =>{
      console.log(resp);
      this.snackbar.showNotification("Movie : " + movieName + " has been added in movies collection", 'ok', 'success');
      this.router.navigateByUrl('/dashboard');
    })
  }



  updateFormVisibility = false;
  updateCount: number = 1;
  updateMovieId: any;
  updateMovieName: any;

  updateMovieButton(movieData: any) {
    this.updateFormVisibility = true;
    this.updateMovieId = movieData.movieId;
    this.updateMovieName = movieData.movieName;
  }

  mId: any;
  mName: any;
  mDur: any;
  mThumb: any;
  mGenre: any;
  mSource: any;
  mDesc: any;
  mRate: any;

  updateMovie(givenRating: any, givenGenre: any) {
    if (givenRating <= 10) {
      for (let k of this.allMoviesData) {
        if (k.movieId == this.updateMovieId) {
          this.mId = k.movieId;
          this.mName = k.movieName;
          this.mDur = k.duration;
          this.mThumb = k.thumbnail;
          this.mGenre = givenGenre;
          this.mSource = k.sourceUrl;
          this.mDesc = k.description;
          this.mRate = givenRating;
          break;
        }
      }
      this.adminService.updateMovieInDatabase({
        "movieId": this.mId, "movieName": this.mName, "duration": this.mDur,
        "thumbnail": this.mThumb, "genre": this.mGenre, "sourceUrl": this.mSource, "description": this.mDesc,
        "rating": this.mRate
      }, this.mId).subscribe(response => {
        console.log(response);
        this.snackbar.showNotification("Movie : " + this.mName + " has been updated with genre :" + this.mGenre + " and rating : " + this.mRate, 'ok', 'success');
        this.updateFormVisibility = false;
        this.getAllMovies();
      })
    }
    else {
      this.snackbar.showNotification("Rating should be in between 0 to 10", 'ok', 'error');
    }
  }

  deleteMovie(movieData: any) {
    this.snackbar.openConfirmBox("Movie : " + movieData.movieName + " will be deleted permanently " + localStorage.getItem('userName'))
      .afterClosed().subscribe((res) => {
        if (res) {
          this.adminService.deleteMovieFromDatabase(movieData.movieId).subscribe(res => {
            console.log(res);
            this.snackbar.showNotification("Movie : " + movieData.movieName + " has been deleted successfully", 'ok', 'success');
            this.getAllMovies();
          })
        }
        else {
          this.snackbar.showNotification("Request aborted", 'ok', 'error');
        }
      });
  }


}
