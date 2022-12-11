import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MovieData } from '../classes/movies';
import { AdminService } from '../Services/admin.service';
import { AuthenticationService } from '../Services/authentication.service';
import { MovieService } from '../Services/movie.service';
import { SnackbarService } from '../Services/snackbar.service';
import { CommonMethodsService } from '../Services/common-methods.service';
import { CombineMethodsService } from '../Services/combine-methods.service';
import { repMovieData } from '../classes/repMovies';
import { ReportedService } from '../Services/reported.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  page: number = 1;
  counter: number = 0;
  cardsize: number = 10;


  constructor(private router: Router, private userService: MovieService, private adminService: AdminService,
    private authService: AuthenticationService, private sanitizer: DomSanitizer,
    private snackbar: SnackbarService, private commonService: CommonMethodsService, private combineService: CombineMethodsService,
    private reportService: ReportedService, private element: ElementRef) {
    this.getUser = localStorage.getItem('userName')?.toUpperCase();
    if (localStorage.getItem('userRole') == "ROLE_ADMIN") {
      this.isUserAdmin = true;
    }
  }

  getUser: any;
  isUserAdmin: boolean = false;

  ngOnInit(): void {
    this.time();
    this.getAllMovies();
    this.getProfileImage();
    this.getAllFavMoviesOfUser();
    this.getReportedMovies();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  userImage: any;
  getProfileImage() {
    this.userImage = this.combineService.getProfileImage();
  }

  hideprogress: boolean = true;
  hideCards: boolean =false;
  time() {
    setTimeout(() => {
      this.hideprogress = false;
      this.hideCards = true;
    }, 800)
  }


  allMoviesData: Array<MovieData> = [];
  getAllMovies() {
    this.allMoviesData = this.commonService.getAllMovies();
  }

  userFavourites: Array<MovieData> = [];
  favCalled: boolean = false;
  userFavMsg: any;

  getAllFavMoviesOfUser() {
    this.userService.getAllFavMoviesOfUser(localStorage.getItem('userEmail')).subscribe(res => {
      this.userFavourites.length = 0;
      for (let i of res) {
        this.userFavourites.push(i)
      }
    })
    this.userFavMsg = "FAVOURITES OF " + localStorage.getItem('userName')?.toUpperCase();
    console.log(this.userFavourites);
  }

  userFavCount = 1;
  userFavCalledMethod() {
    this.userFavCount++
    if (this.userFavCount % 2 == 0) {
      this.favCalled = true;
    }
    else this.favCalled = false;
  }

  favourite(movieData: any) {
    let count = 0;
    for (let i of this.userFavourites) {
      if (i.movieId == movieData.movieId) {
        count++;
        this.snackbar.showNotification("Movie is already added in favourites", 'ok', 'error');
        break;
      }
    }
    if (count == 0) {
      this.userService.addUserFavMovies({
        "movieId": movieData.movieId, "tmbdId": movieData.tmbdId, "movieName": movieData.movieName,
        "duration": movieData.duration, "thumbnail": movieData.thumbnail, "genre": movieData.genre,
        "sourceUrl": movieData.sourceUrl, "description": movieData.description, "rating": movieData.rating
      },
        localStorage.getItem('userEmail')).subscribe(k => {
          this.snackbar.showNotification("Movie has been added to favourites", 'ok', 'success');
          this.getAllFavMoviesOfUser();
        });
    }
  }


  unFavourite(movieId: any) {
    this.userService.removeUserFavMovie(localStorage.getItem('userEmail'), movieId).subscribe(k => {
      this.snackbar.showNotification("Movie has been removed from favourites", 'ok', 'success');
      this.getAllFavMoviesOfUser();
    });

  }

  getAllReportedMovies: Array<repMovieData> = [];
  userRepCalled: boolean = false;
  userRepMsg: any;
  userRepCount = 1;

  userRepCalledMethod() {
    this.userRepCount++
    if (this.userRepCount % 2 == 0) {
      this.userRepCalled = true;
    }
    else this.userRepCalled = false;
    this.userRepMsg = "REPORTED MOVIES OF " + localStorage.getItem('userName')?.toUpperCase();
  }

  getReportedMovies() {
    this.userService.getAllReportedMovies(localStorage.getItem('userEmail')).subscribe(res => {
      this.getAllReportedMovies.length = 0;
      for (let i of res) {
        this.getAllReportedMovies.push(i);
      }
    })
    console.log(this.getAllReportedMovies);
  }

  ReportMovies(reportedMovie: any) {
    console.log(reportedMovie);
    let count = 0;
    for (let i of this.getAllReportedMovies) {
      if (i.repMovieId == reportedMovie.movieId) {
        count++;
        this.snackbar.showNotification("Movie is already reported by you " + localStorage.getItem('userName'), 'ok', 'error');
        break;
      }
    }
    if (count == 0) {
      this.userService.addReportedMovies({
        "repMovieId": reportedMovie.movieId, "tmbdId": reportedMovie.tmbdId, "repMovieName": reportedMovie.movieName,
        "repDuration": reportedMovie.duration, "repThumbnail": reportedMovie.thumbnail, "repGenre": reportedMovie.genre,
        "repSourceUrl": reportedMovie.sourceUrl, "repDescription": reportedMovie.description, "repRating": reportedMovie.rating
      },
        localStorage.getItem('userEmail')).subscribe(k => {
          this.snackbar.showNotification("Movie " + reportedMovie.movieName + " is reported by you " + localStorage.getItem('userName'), 'ok', 'success');
          this.getReportedMovies();
        });
      // this.reportService.ReportMovie(reportedMovie.movieId).subscribe(resp => {
      //   console.log(resp);
      // })
    }
  }

  unReportMovie(reportedMovieId: any, repMovieName: any) {
    this.userService.removeReportedMovie(localStorage.getItem('userEmail'), reportedMovieId).subscribe(response => {
      console.log(response);
      this.snackbar.showNotification("Movie " + repMovieName + " is unreported by you " + localStorage.getItem('userName'), 'ok', 'success');
      this.getReportedMovies();
    })
  }

  moviesByGenre: Array<MovieData> = [];
  searchMsg: any;
  searchCalled = false;

  getRomanticMovie() {
    this.moviesByGenre = this.commonService.getRomanticMovie();
    this.searchMsg = "SEARCH RESULTS : GENRE - ROMANTIC";
    this.searchCalled = true;
  }

  getComedyMovie() {
    this.moviesByGenre = this.commonService.getComedyMovie();
    this.searchMsg = "SEARCH RESULTS : GENRE - COMEDY";
    this.searchCalled = true;
  }

  getScifiMovie() {
    this.moviesByGenre = this.commonService.getScifiMovie();
    this.searchMsg = "SEARCH RESULTS : GENRE - SCI-FI";
    this.searchCalled = true;
  }

  getAdventureMovie() {
    this.moviesByGenre = this.commonService.getAdventureMovie();
    this.searchMsg = "SEARCH RESULTS : GENRE - ADVENTURE";
    this.searchCalled = true;
  }

  getThrillerMovie() {
    this.moviesByGenre = this.commonService.getThrillerMovie();
    this.searchMsg = "SEARCH RESULTS : GENRE - THRILLER";
    this.searchCalled = true;
  }

  getActionMovie() {
    this.moviesByGenre = this.commonService.getActionMovie();
    this.searchMsg = "SEARCH RESULTS : GENRE - ACTION";
    this.searchCalled = true;
  }

  getRatingAbove7() {
    this.moviesByGenre = this.commonService.getRatingAbove7();
    this.searchCalled = true;
    this.searchMsg = "SEARCH RESULTS : RATINGS - ABOVE 7";
  }

  getRatingAbove8() {
    this.moviesByGenre = this.commonService.getRatingAbove8();
    this.searchCalled = true;
    this.searchMsg = "SEARCH RESULTS : RATINGS - ABOVE 8";
  }

  getRatingAbove9() {
    this.moviesByGenre = this.commonService.getRatingAbove9();
    this.searchCalled = true;
    this.searchMsg = "SEARCH RESULTS : RATINGS - ABOVE 9";
  }

  removeAllSearch() {
    this.moviesByGenre.length = 0;
    this.userFavourites.length = 0;
    this.searchCalled = false;
    this.favCalled = false;
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

  redirectToAdmin() {
    this.router.navigateByUrl("/admin");
  }

  redirectToAboutUs() {
    this.router.navigateByUrl("/aboutus");
  }

  redirectToAllMovies(){
    this.router.navigateByUrl("/allmovies");
  }

  featureBtn:any=false;

  redirectToLatestFix() {
    this.hideCards=false;
    this.featureBtn=true;
    this.router.navigateByUrl('/dashboard/latestfix');
  }


  redirectToDashAgain() {
    this.router.navigateByUrl('/dashboard');
    this.hideCards=true;
    this.featureBtn=false;
  }

  removeSearchBar() {
    this.searchData.length = 0;
    this.myControl.reset();
  }

  deleteAccount() {
    this.snackbar.openConfirmBox("This action can not be undone! " + localStorage.getItem('userName'))
      .afterClosed().subscribe((res) => {
        if (res) {
          this.userService.deleteUserAccount(localStorage.getItem('userEmail')).subscribe(response => {
            console.log(response);
            this.snackbar.showNotification("Account deleted successfully", 'ok', 'success');
            this.router.navigateByUrl('');
          })
        }
        else {
          this.snackbar.showNotification("Request aborted", 'ok', 'error');
        }
      })
  }

  logout() {
    localStorage.removeItem('jwtkey');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userImage');
    this.authService.userAuthFailed = false;
    this.authService.isUserLoggedIn = false;
    this.isUserAdmin = false;
    this.router.navigateByUrl('/login');
  }

  onCardDataChange(event: any) {
    this.page = event;
    this.getAllMovies();
  }

  oncardSizeChange(event: any): void {
    this.cardsize = event.target.value;
    this.page = 1;
    this.getAllMovies();
  }
}
