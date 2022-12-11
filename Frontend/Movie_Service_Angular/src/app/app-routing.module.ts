import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUSComponent } from './about-us/about-us.component';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { AllMoviesComponent } from './all-movies/all-movies.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminGuardGuard } from './guards/admin-guard.guard';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { DataLossGuard } from './guards/data-loss.guard';
import { DataLoss2Guard } from './guards/data-loss2.guard';
import { HomepageComponent } from './homepage/homepage.component';
import { LatestFixComponent } from './latest-fix/latest-fix.component';
import { LoginComponent } from './login/login.component';
import { PlayvideoComponent } from './playvideo/playvideo.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TmdbvideoComponent } from './tmdbvideo/tmdbvideo.component';


const routes: Routes = [
  {path:"",component:HomepageComponent},
  {path:"login",component:LoginComponent},
  {path:"signup",component:SignUpComponent, canDeactivate:[DataLossGuard]},
  {path:"admin",component:AdminpageComponent,canActivate:[AuthGuardGuard]},//,canDeactivate:[DataLoss2Guard]
  {path:"video/:id",component:PlayvideoComponent},
  {path:"tmdbvideo/:id",component:TmdbvideoComponent},
  {path:"aboutus",component:AboutUSComponent},
  {path:"allmovies",component:AllMoviesComponent},
  {path:"dashboard",component:DashboardComponent, canActivate:[AuthGuardGuard],//canActivateChild:[AdminGuardGuard],
  children:
  [
    {path:"latestfix",component:LatestFixComponent},
  ]
}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
