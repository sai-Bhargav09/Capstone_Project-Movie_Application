import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MovieData } from '../classes/movies';
import { repMovieData } from '../classes/repMovies';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private httpClient: HttpClient) { }

  //api gataway port : 9020
  //token required for everything

 //baseUrl="http://localhost:8085/app/movie";
 baseUrl="http://localhost:9020/app/movie";


  getAllFavMoviesOfUser(userEmail:any){
    let httpHeader = new HttpHeaders({
      'Authorization' : 'Bearer '+ localStorage.getItem('jwtkey')
    });
    let token = { headers : httpHeader }
    return this.httpClient.get<MovieData[]>(this.baseUrl+"/get/"+userEmail,token);
  }

  addUserFavMovies(userMovie:any, userEmail:any){
    let httpHeader = new HttpHeaders({
      'Authorization' : 'Bearer '+ localStorage.getItem('jwtkey')
    });
    let token = { headers : httpHeader }
    
    return this.httpClient.post(this.baseUrl+"/add/"+userEmail,userMovie,token);
  }

  removeUserFavMovie(userEmail:any, movieId:any){
    let httpHeader = new HttpHeaders({
      'Authorization' : 'Bearer '+ localStorage.getItem('jwtkey')
    });
    let token = { headers : httpHeader }
    return this.httpClient.delete(this.baseUrl+"/remove/"+userEmail+"/"+movieId,token);
  }

  addReportedMovies(userReportedMovie:any, userEmail:any){
    let httpHeader = new HttpHeaders({
      'Authorization' : 'Bearer '+ localStorage.getItem('jwtkey')
    });
    let token = { headers : httpHeader }
    return this.httpClient.post(this.baseUrl+"/reportadd/"+userEmail,userReportedMovie,token);
  }

  removeReportedMovie(userEmail:any, reportedMovieId:any){
    let httpHeader = new HttpHeaders({
      'Authorization' : 'Bearer '+ localStorage.getItem('jwtkey')
    });
    let token = { headers : httpHeader }
    return this.httpClient.delete(this.baseUrl+"/reportrem/"+userEmail+"/"+reportedMovieId,token);
  }

  getAllReportedMovies(userEmail:any){
    let httpHeader = new HttpHeaders({
      'Authorization' : 'Bearer '+ localStorage.getItem('jwtkey')
    });
    let token = { headers : httpHeader }
    return this.httpClient.get<repMovieData[]>(this.baseUrl+"/reportget/"+userEmail,token);
  }

  deleteUserAccount(userEmail:any){
    let httpHeader = new HttpHeaders({
      'Authorization' : 'Bearer '+ localStorage.getItem('jwtkey')
    });
    let token = { headers : httpHeader }
    return this.httpClient.delete(this.baseUrl+"/removeacc/"+userEmail,token);
  }

  sendFeedback(message:any){
    let httpHeader = new HttpHeaders({
      'Authorization' : 'Bearer '+ localStorage.getItem('jwtkey')
    });
    let token = { headers : httpHeader }
    return this.httpClient.post(this.baseUrl+"/feedback/"+message,null,token);
  }
}
