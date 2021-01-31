import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { MatchComponent } from './manager/match/match.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StadiumComponent } from './manager/stadium/stadium.component';

const routes: Routes = [

  {path:'match' , component: MatchComponent},
  {path:'stadium' , component: StadiumComponent},
  {path: 'home/:id' , component: HomeComponent },
  {path: 'home' , component: HomeComponent },
  {path:'signup' , component : SignupComponent },
  {path: 'login' , component: LoginComponent },
  { path: "", redirectTo: "home", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
