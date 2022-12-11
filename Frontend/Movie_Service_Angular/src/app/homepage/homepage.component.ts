import { Component, OnInit } from '@angular/core';
import { AdminService } from '../Services/admin.service';
import { MovieData } from '../classes/movies';
import { DomSanitizer } from '@angular/platform-browser';
import { TopRated } from '../classes/top-rated';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { SnackbarService } from '../Services/snackbar.service';
import { CommonMethodsService } from '../Services/common-methods.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  page: number = 1;
  counter: number = 0;
  cardsize: number = 12;

  constructor(private commonService: CommonMethodsService) {
    this.getAllMovies();
    this.getAllGenre();
  }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  allMoviesData: Array<MovieData> = [];

  getAllMovies() {
    this.allMoviesData = this.commonService.getAllMovies();
  }

  moviesByGenre: Array<MovieData> = [];

  getAllGenre() {
    this.moviesByGenre = this.commonService.getAllGenre();
  }

  getRomanticMovie() {
    this.moviesByGenre = this.commonService.getRomanticMovie();
  }

  getComedyMovie() {
    this.moviesByGenre = this.commonService.getComedyMovie();
  }

  getScifiMovie() {
    this.moviesByGenre = this.commonService.getScifiMovie();
  }

  getAdventureMovie() {
    this.moviesByGenre = this.commonService.getAdventureMovie();
  }

  getThrillerMovie() {
    this.moviesByGenre = this.commonService.getThrillerMovie();
  }

  getActionMovie() {
    this.moviesByGenre = this.commonService.getActionMovie();
  }
  removeSearch() {
    this.searchData.length = 0;
    this.myControl.reset();
  }

  removeGenreSearch() {
    this.moviesByGenre.length = 0;
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
