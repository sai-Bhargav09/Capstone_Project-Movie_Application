import { Component, OnInit } from '@angular/core';
import { AdminService } from '../Services/admin.service';
import { DomSanitizer } from '@angular/platform-browser';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { MovieData } from '../classes/movies';
import { SnackbarService } from '../Services/snackbar.service';
import { CommonMethodsService } from '../Services/common-methods.service';
import { ReportedService } from '../Services/reported.service';
import { reportedMovies } from '../classes/Reported';
import { Router } from '@angular/router';
@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})
export class AdminpageComponent implements OnInit {
  status: boolean = false;

  constructor(private adminService: AdminService, private sanitizer: DomSanitizer, private snackbar: SnackbarService,
    private commonService: CommonMethodsService, private reportServ: ReportedService, private router:Router) { }

  ngOnInit(): void {
    this.time();
    this.getAllMovies();
    this.getReportedMovie();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  updating: boolean = true;
  loading: boolean = false;

  time() {
    setTimeout(() => {
      this.updating = false;
      this.loading = true;
    }, 1500)
  }


  allMoviesData: Array<MovieData> = [];

  getAllMovies() {
    this.allMoviesData = this.commonService.getAllMovies();
  }


  myControl = new FormControl('');

  options: string[] = ['Titanic', 'Three Idiots', 'RedDead Redemption 2', 'Avengers', 'La La Land',
    'Avatar', 'Interstellar', 'Joker', 'Spider-Man: No Way Home', 'Inception', 'Dune', 'Raya and the Last Dragon',
    'Spider-Man: Into the Spider-Verse', 'The Matrix', 'The Batman', 'Ratatouille', 'How to Train Your Dragon: The Hidden World',
    'Inside Out', 'Up', 'Frozen', 'Coco', 'The Lion King', 'WALL-E', 'Despicable Me', 'Kung Fu Panda', 'Finding Nemo',
    'Brahmāstra: Part One Shiva', 'Shershaah', 'Super 30', 'Andhadhun', 'Bajirao Mastani', 'War', 'Dangal', 'PK',
    'RRR', 'Pushpa: The Rise', 'Radhe Shyam', 'Hit', 'Rangasthalam', 'Baahubali: The Beginning', 'Saaho', '2.0',
    'K.G.F: Chapter 2', 'Vikram', 'Ala Vaikunthapurramuloo', 'Oh! Baby', 'Adipurush', 'Eega', 'Yeh Jawaani Hai Deewani',
    'Vaaranam Aayiram'];
  filteredOptions: Observable<string[]> | undefined;

  searchData: Array<MovieData> = [];
  searchResultMessage = "";
  imageUrlForSearch = "";

  searchResult(selected: any) {
    this.searchResultMessage = "Search Result for movie : " + selected;
    this.searchData = this.commonService.searchResult(selected);
    this.imageUrlForSearch = this.searchData[0].thumbnail;
  }


  removeSearch() {
    this.searchData.length = 0;
    this.myControl.reset();
  }

  // updateFormVisibility = false;
  // updateCount: number = 1;
  // updateMovieId: any;
  // updateMovieName: any;


  // updateMovieButton(movieData: any) {
  //   this.updateFormVisibility = true;
  //   this.updateMovieId = movieData.movieId;
  //   this.updateMovieName = movieData.movieName;
  // }

  // mId: any;
  // mName: any;
  // mDur: any;
  // mThumb: any;
  // mGenre: any;
  // mSource: any;
  // mDesc: any;
  // mRate: any;

  // updateMovie(givenRating: any, givenGenre: any) {
  //   if (givenRating <= 10) {
  //     for (let k of this.allMoviesData) {
  //       if (k.movieId == this.updateMovieId) {
  //         this.mId = k.movieId;
  //         this.mName = k.movieName;
  //         this.mDur = k.duration;
  //         this.mThumb = k.thumbnail;
  //         this.mGenre = givenGenre;
  //         this.mSource = k.sourceUrl;
  //         this.mDesc = k.description;
  //         this.mRate = givenRating;
  //         break;
  //       }
  //     }
  //     this.adminService.updateMovieInDatabase({
  //       "movieId": this.mId, "movieName": this.mName, "duration": this.mDur,
  //       "thumbnail": this.mThumb, "genre": this.mGenre, "sourceUrl": this.mSource, "description": this.mDesc,
  //       "rating": this.mRate
  //     }, this.mId).subscribe(response => {
  //       console.log(response);
  //       this.snackbar.showNotification("Movie : " + this.mName + " has been updated with genre :" + this.mGenre + " and rating : " + this.mRate, 'ok', 'success');
  //       this.updateFormVisibility = false;
  //       this.getAllMovies();
  //     })
  //   }
  //   else {
  //     this.snackbar.showNotification("Rating should be in between 0 to 10", 'ok', 'error');
  //   }
  // }

  deleteMovie(movieData: any) {
    this.snackbar.openConfirmBox("Movie : " + movieData.movieName + " will be deleted permanently " + localStorage.getItem('userName'))
      .afterClosed().subscribe((res) => {
        if (res) {
          this.adminService.deleteMovieFromDatabase(movieData.movieId).subscribe(res => {
            console.log(res);
            this.snackbar.showNotification("Movie : " + movieData.movieName + " has been deleted successfully", 'ok', 'success');
            this.getAllMovies();
            this.router.navigateByUrl("/dashboard");
          })
        }
        else {
          this.snackbar.showNotification("Request aborted", 'ok', 'error');
        }
      });
  }

  reportedMovieUnit: any;
  allReportedMoviesData: Array<reportedMovies> = [];
  sortedData: Array<MovieData> = [];

  getReportedMovie() {
    let count = 0;
    this.reportServ.getReportedMovie().subscribe(resp => {
      console.log(resp);
      this.allReportedMoviesData.length == 0;
      for (let i of resp) {
        count++;
        this.allReportedMoviesData.push(i);
      }
      this.reportedMovieUnit = count;
      this.sortedData.length = 0;
      for (let i of this.allMoviesData) {
        for (let j of this.allReportedMoviesData) {
          if (i.movieId == j._id) {
            this.sortedData.push(i);
          }
        }
      }
      console.log(this.sortedData);
    });
  }

  showReportedMovies: boolean = false;
  visi2Count: number = 0;

  reportedVisibility() {
    this.visi2Count++;
    if (this.visi2Count % 2 == 0) {
      this.showReportedMovies = false;
    } else this.showReportedMovies = true;
  }

  removeAllReportedData() {
    this.reportServ.removeAllReportedData().subscribe(resp => {
      console.log(resp);
      this.allReportedMoviesData.length = 0;
      this.getReportedMovie();
      this.showReportedMovies = false;
    })

  }
}
