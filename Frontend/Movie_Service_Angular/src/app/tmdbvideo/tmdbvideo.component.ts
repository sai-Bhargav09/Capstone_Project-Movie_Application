import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieData } from '../classes/movies';
import { TmdbVideo } from '../classes/Tmdb';
import { TopRated } from '../classes/top-rated';
import { AdminService } from '../Services/admin.service';
import { AuthenticationService } from '../Services/authentication.service';

@Component({
  selector: 'app-tmdbvideo',
  templateUrl: './tmdbvideo.component.html',
  styleUrls: ['./tmdbvideo.component.css']
})
export class TmdbvideoComponent implements OnInit {

  isVideoEnabled:boolean = true;
  videoUrl:any;
  allMoviesData: Array<MovieData> = [];
  movieid=this.param.snapshot.paramMap.get('id');
  moviefetch:Array<MovieData> = [];
  sourceUrl:any=[];

  constructor(private sanitizer: DomSanitizer,private adminService: AdminService, private param:ActivatedRoute,private router: Router,
    private authService:AuthenticationService) {
    this.getVideo();
   }

  ngOnInit(): void {
    this.check();  
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
   this.getTmdbMovieData();
       
  }

  count=0;
  videoData: any;
  videoList: any;
  videoArray:Array<TmdbVideo>=[];
  videoKey: any;

  getmovie(){
   return this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + this.videoKey);
  }

  
 
  check() {
    this.adminService.getAllMovies().subscribe(v => {
      this.allMoviesData.length = 0;
      for (let i of v) {
        this.allMoviesData.push(i);
      }
    })
  }  

  moreMovies:Array<TopRated>=[];
  more:any;
  flag:boolean = false;
  moreLikeThis(){
    this.adminService.getMoreLikeThis(this.movieid).subscribe(
      response=>{
        this.moreMovies.length=0;
        this.more=response;
        // console.log(this.more);
        for(let m of this.more.results){
          this.moreMovies.push(m);
          this.flag=true;
        }
        // console.log(this.moreMovies);
      }
    )
  }

  getVideo() {
    this.adminService.getVideo(this.movieid).subscribe(
      response => {
        this.videoData = response;
        this.videoList = this.videoData.results;
        // console.log(this.videoList);
        for(let v of this.videoList){
          if(v.type=="Trailer"){
            this.videoKey = v.key;
          }
        }
        // this.videoKey = this.videoList[0].key;
        // console.log(this.videoKey);
      }
    )
  }

  getVideo1() {
    
    this.adminService.getVideo(this.movieid).subscribe(
      response => {
        this.videoData = response;
        this.videoList = this.videoData.results;
        // console.log(this.videoList);
        this.videoKey = this.videoList[0].key;
        // console.log(this.videoKey);
      }
    )
    
  }

  tmdbMovieData:any;
  tmdbID:Array<TopRated>=[];
  id:any;
  
  getTmdbMovieData(){
    this.adminService.getTmdbMovieDetails(this.movieid).subscribe(
      response => {
        this.tmdbMovieData=response;
        console.log(this.tmdbMovieData);
        this.tmdbID.push(this.tmdbMovieData);
        this.id=this.tmdbID[0].id;
        console.log(this.id)
      }
    )
  }

  goBack(){
    if(this.authService.isUserLoggedIn==true){
      this.router.navigateByUrl('dashboard');
    }
    else if(this.authService.isUserLoggedIn==false){
      this.router.navigateByUrl('');
    }
  }

}
