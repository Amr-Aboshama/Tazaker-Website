import { match } from 'src/app/classes/match';
import { reserved } from './../../classes/reserved';
import { User } from './../../classes/User';
import { ReservationsService } from './reservations.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { from } from 'rxjs';
import { from as observableFrom } from 'rxjs';
import { concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {

  id: number;
  User : User;
  tickets : reserved[];
  matches : match[] = [];

  constructor(private HttpService: ReservationsService ,private route: ActivatedRoute , private router: Router) {
    this.id = parseInt(localStorage.getItem('role'), 10);
    console.log('THE ID IS in reservations :' , this.id);



   }

  ngOnInit(): void {

    //  this.HttpService.getUserInfo()
    // .subscribe( data => {
    //   this.User = data.user,
    //   this.tickets = data.user.tickets,

    //   //console.log(data),
    //   (err: any) => console.log(err),
    //   //console.log(this.User)
    //   console.log("MY TICKETS AREEE :", this.tickets),
    //   this.getMatchDetails()
    //  // console.log('ALL MATCHES AREEEE ' , this.matches[0])

    // }
    // );

    this.refreshUser();


  }


  cancelReservation(ticket_id : number){
    this.HttpService.cancelMatchReservation(ticket_id).subscribe(
      data => {

        alert("Ticket is canceled successfully")
        this.refreshUser();
      },
      error =>
      {
        console.log(error)
        alert("We are sorry its too late to cancel the ticket ")
        }


    )
  }

  refreshUser(){
    this.HttpService.getUserInfo().subscribe(
      data => {
        this.User = data.user,
        this.tickets = data.user.tickets,
        console.log(data),
        (err: any) => console.log(err),
        console.log(this.User),
        this.getMatchDetails()

      });
  }

  async getMatchDetails(){
    console.log(' TICKETS LENGHTHHHHHHHHHHH ',this.tickets.length)
    this.matches =[];
    for (var i = 0 ; i < this.tickets.length ; i ++){
      //console.log('i : ' , i),
      console.log('here is my ids ',this.tickets[i].match_id)
      let data = await this.HttpService.getMatchName(this.tickets[i].match_id)
     
      this.matches.push(data.matches[0]);
      

    }
   


  }





}
