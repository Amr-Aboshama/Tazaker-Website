import { ReservationsComponent } from './fan/reservations/reservations.component';
import { PendingComponent } from './admins/pending/pending.component';
import { SeatsComponent } from './manager/seats/seats.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { MatchComponent } from './manager/match/match.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StadiumComponent } from './manager/stadium/stadium.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [

  {path:'match' , component: MatchComponent},
  { path:'editmatch/:id', component: MatchComponent },
  {path:'pending', component: PendingComponent},
  {path:'reservataions', component: ReservationsComponent},
  {path:'seats/:id' , component: SeatsComponent},
  {path:'stadium' , component: StadiumComponent},
  {path: 'home/:id' , component: HomeComponent },
  {path: 'home' , component: HomeComponent },
  {path:'signup' , component : SignupComponent },
  {path: 'login' , component: LoginComponent },
  {path: 'profile', component: ProfileComponent},
  { path: "**", redirectTo: "home", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
