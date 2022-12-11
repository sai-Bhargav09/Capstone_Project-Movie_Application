import { Injectable } from '@angular/core';
import { MovieData } from '../classes/movies';
import { AdminService } from './admin.service';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class CommonMethodsService {

  constructor(private adminService: AdminService, private snackbar: SnackbarService) { }
  

  allMoviesData: Array<MovieData> = [];

  getAllMovies() {
    this.adminService.getAllMovies().subscribe(v => {
      console.log(v)
      this.allMoviesData.length = 0;
      for (let i of v) {
        this.allMoviesData.push(i);
      }
    })
    return this.allMoviesData;
  }


  searchData: Array<MovieData> = [];
  imageUrlForSearch = "";

  searchResult(selected: any) {
    let count2 = 0;
    this.searchData.length = 0;
    this.getAllMovies();
    for (let i of this.allMoviesData) {
      if (i.movieName == selected) {
        this.searchData.push(i);
        count2++;
        break;
      }
    }
    if (count2 == 0) {
      this.snackbar.showNotification("This movie is pending for screening and rating", 'ok', 'error');
      // alert("This movie is pending for screening and rating");
    }
    else {
      this.imageUrlForSearch = this.searchData[0].thumbnail;
      console.log(this.searchData);
    }
    return this.searchData;
  }


  moviesByGenre: Array<MovieData> = [];

  getAllGenre() {
    this.adminService.getAllMovies().subscribe(r => {
      this.moviesByGenre.length = 0;
      for (let i of r) {
        this.moviesByGenre.push(i);
      }
    })
    return this.moviesByGenre;
  }

  getRomanticMovie() {
    this.adminService.getAllMovies().subscribe(r => {
      this.moviesByGenre.length = 0;
      for (let i of r) {
        if (i.genre === "romantic") {
          this.moviesByGenre.push(i);
        }
      }
    })
    return this.moviesByGenre;
  }

  getComedyMovie() {
    this.adminService.getAllMovies().subscribe(r => {
      this.moviesByGenre.length = 0;
      for (let i of r) {
        if (i.genre === "comedy") {
          this.moviesByGenre.push(i);
        }
      }
    })
    return this.moviesByGenre;
  }

  getScifiMovie() {
    this.adminService.getAllMovies().subscribe(r => {
      this.moviesByGenre.length = 0;
      for (let i of r) {
        if (i.genre === "SciFi") {
          this.moviesByGenre.push(i);
        }
      }
    })
    return this.moviesByGenre;
  }

  getAdventureMovie() {
    this.adminService.getAllMovies().subscribe(r => {
      this.moviesByGenre.length = 0;
      for (let i of r) {
        if (i.genre === "adventure") {
          this.moviesByGenre.push(i);
        }
      }
    })
    return this.moviesByGenre;
  }

  getThrillerMovie() {
    this.adminService.getAllMovies().subscribe(r => {
      this.moviesByGenre.length = 0;
      for (let i of r) {
        if (i.genre === "thriller") {
          this.moviesByGenre.push(i);
        }
      }
    })
    return this.moviesByGenre;
  }

  getActionMovie() {
    this.adminService.getAllMovies().subscribe(r => {
      this.moviesByGenre.length = 0;
      for (let i of r) {
        if (i.genre === "action") {
          this.moviesByGenre.push(i);
        }
      }
    })
    return this.moviesByGenre;
  }


  getRatingAbove7() {
    this.adminService.getAllMovies().subscribe(r => {
      this.moviesByGenre.length = 0;
      for (let i of r) {
        if (i.rating >= 7 && i.rating < 8) {
          this.moviesByGenre.push(i);
        }
      }
    })
    return this.moviesByGenre;
  }

  getRatingAbove8() {
    this.adminService.getAllMovies().subscribe(r => {
      this.moviesByGenre.length = 0;
      for (let i of r) {
        if (i.rating >= 8 && i.rating <  9) {
          this.moviesByGenre.push(i);
        }
      }
    })
    return this.moviesByGenre;
  }

  getRatingAbove9() {
    this.adminService.getAllMovies().subscribe(r => {
      this.moviesByGenre.length = 0;
      for (let i of r) {
        if (i.rating >= 9) {
          this.moviesByGenre.push(i);
        }
      }
    })
    return this.moviesByGenre;
  }

  windowConfirm() {
    let result = false;
    this.snackbar.openConfirmBox("Are you sure to exit ")
      .afterClosed().subscribe((res) => {
        if (res) {
          result = true;
          return result;
        }
        else {
          result = false;
          return result;
        }
      });
    alert(result);
    return result;
  }


}
