import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieData } from '../classes/movies';
import { TmdbVideo } from '../classes/Tmdb';
import { TopRated } from '../classes/top-rated';
import { AdminService } from '../Services/admin.service';
import { AuthenticationService } from '../Services/authentication.service';

@Component({
  selector: 'app-playvideo',
  templateUrl: './playvideo.component.html',
  styleUrls: ['./playvideo.component.css']
})
export class PlayvideoComponent implements OnInit {

  isVideoEnabled:boolean = true;
  videoUrl:any;
  allMoviesData: Array<MovieData> = [];
  getmovieid:any;
  moviefetch:Array<MovieData> = [];
  sourceUrl:any=[];
  

  constructor(private sanitizer: DomSanitizer,private adminService: AdminService, private param:ActivatedRoute, 
    private router:Router,private authService:AuthenticationService) {
    
   }

  ngOnInit(): void {
    this.check();   
  }

  getmovie(){
    this.getmovieid = this.param.snapshot.paramMap.get('id'); 
    for(let k of this.allMoviesData){
      if(k.movieId==this.getmovieid){
        this.sourceUrl=k;
      }
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.sourceUrl.sourceUrl);
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
    this.adminService.getMoreLikeThis(this.sourceUrl.tmdbId).subscribe(
      response=>{
        this.moreMovies.length=0;
        this.more=response;
        console.log(this.more);
        for(let m of this.more.results){
          this.moreMovies.push(m);
          this.flag=true;
        }
        // console.log(this.moreMovies);
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

  videoData: any;
  videoList: any;
  videoArray:Array<TmdbVideo>=[];
  videoKey: any;
  getmovie1(){
    return this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + this.videoKey);
  }
  getmovieid1:any;
  playtmdb:boolean=false;
  
  getVideo(id:any) {
    this.playtmdb=true;
    this.adminService.getVideo(id).subscribe(
      response => {
        this.videoData = response;
        this.videoList = this.videoData.results;
        console.log(this.videoList);
        this.videoKey = this.videoList[0].key;
        console.log(this.videoKey);
      }
    )
  }
  
}
