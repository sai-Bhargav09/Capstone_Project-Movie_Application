import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MovieData } from '../classes/movies';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient: HttpClient) { }

   //api gataway port : 9020
  //token required for everything

 // baseUrl="http://localhost:8088/appl"
 baseUrl="http://localhost:9020/appl"

  getAllMovies(){
    return this.httpClient.get<MovieData[]>(this.baseUrl+"/get");
  }

  addNewMovieInDatabase(movie:any){
    let httpHeader = new HttpHeaders({
      'Authorization' : 'Bearer '+ localStorage.getItem('jwtkey')
    });
    let token = { headers : httpHeader }
    return this.httpClient.post(this.baseUrl+"/movie/add",movie,token);
  }

  updateMovieInDatabase(movie:any, movieId:any){
    let httpHeader = new HttpHeaders({
      'Authorization' : 'Bearer '+ localStorage.getItem('jwtkey')
    });
    let token = { headers : httpHeader }
    return this.httpClient.post(this.baseUrl+"/movie/update/"+movieId, movie,token);
  }

  deleteMovieFromDatabase(movieId:any){
    let httpHeader = new HttpHeaders({
      'Authorization' : 'Bearer '+ localStorage.getItem('jwtkey')
    });
    let token = { headers : httpHeader }
    return this.httpClient.delete(this.baseUrl+"/movie/remove/"+movieId, token);
  }

  getRecommendations(){
    return this.httpClient.get("https://api.themoviedb.org/3/movie/top_rated?api_key=05ccecf805853e5afa27d5f037273f5a&language=en-US&page=1");
  }

  getVideo(id:any){
    return this.httpClient.get("https://api.themoviedb.org/3/movie/"+id+"/videos?api_key=05ccecf805853e5afa27d5f037273f5a&language=en-US")
  }
  getMoreLikeThis(id:any){
    return this.httpClient.get("https://api.themoviedb.org/3/movie/"+id+"/recommendations?api_key=05ccecf805853e5afa27d5f037273f5a&language=en-US&page=1")
  }
  getTmdbMovieDetails(id:any){
    return this.httpClient.get("https://api.themoviedb.org/3/movie/"+id+"?api_key=05ccecf805853e5afa27d5f037273f5a&language=en-US");
  }

}
