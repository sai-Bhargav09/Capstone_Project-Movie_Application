import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../Services/movie.service';
import { SnackbarService } from '../Services/snackbar.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUSComponent implements OnInit {

  constructor(private router: Router, private movieService: MovieService, private snackbar: SnackbarService) { }

  ngOnInit(): void {
  }

  backToDashboard() {
    this.router.navigateByUrl('/dashboard');
  }

  sendFeedback(message: any) {
    if (message.length <= 15) {
      this.snackbar.showNotification("We appreciate if you eleborate a little :) " + localStorage.getItem('userName'), 'ok', 'error');
    }
    else {
      this.snackbar.showNotification("Thank you for your valuable feedback :)", 'ok', 'success');
      this.movieService.sendFeedback(message).subscribe(resp => {
        console.log(resp);
      })
    }
  }
}
