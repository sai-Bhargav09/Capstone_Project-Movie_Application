import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { reportedMovies } from '../classes/Reported';

@Injectable({
  providedIn: 'root'
})
export class ReportedService {

  constructor(private httpClient: HttpClient) { }

  //baseUrl="http://localhost:8092/appli/report";
  baseUrl="http://localhost:9020/appli/report";

  ReportMovie(repMovieId:any){
    return this.httpClient.post(this.baseUrl+"/add/"+repMovieId,{responseType:'json'});
  }

  getReportedMovie(){
    return this.httpClient.get<reportedMovies[]>(this.baseUrl+"/get");
  }

  removeAllReportedData(){
    return this.httpClient.post(this.baseUrl+"/remove",{responseType:'json'});
  }

}
