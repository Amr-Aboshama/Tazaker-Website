import { match } from 'src/app/classes/match';
import { reserved } from './../../classes/reserved';
import { User } from './../../classes/User';
import { ReservationsService } from './reservations.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {

  id: number;
  User : User;
  tickets : reserved[];
  match : match;

  constructor(private HttpService: ReservationsService ,private route: ActivatedRoute , private router: Router) {
    this.id = parseInt(localStorage.getItem('role'), 10);
    console.log('THE ID IS in reservations :' , this.id);


   }

  ngOnInit(): void {

     this.HttpService.getUserInfo()
    .subscribe( data => {
      this.User = data.user,
      this.tickets = data.user.tickets,
      this.getMatchDetails(),

      console.log(data),
      (err: any) => console.log(err),
      console.log(this.User)
      console.log("MY TICKETS AREEE :", this.tickets)


    }
    );

    // get match name by id
    //this.getMatchNameById(1)

    console.log(this.tickets);

  }

  getMatchNameById(match_id : number , index : number){
    this.HttpService.getMatchName(match_id).subscribe(data => {
      this.tickets[index].match_details = data.matches[0],
      console.log('my match id and dataaa is ', this.match),
      (err: any) => console.log(err),
      console.log(this.User)
    })

  }

  cancelReservation(ticket_id : number){
    this.HttpService.cancelMatchReservation(ticket_id).subscribe(
      data => {
        (err: any) => console.log(err)

        this.refreshUser();
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
        console.log(this.User)
      });
  }

  getMatchDetails(){
    console.log('tickets Number: ' + this.tickets.length);
    for (var i = 0 ; i < this.tickets.length ; i++){
      this.getMatchNameById(this.tickets[i].match_id , i);
      //console.log(this.match);
      //console.log('###################################');
      //this.tickets[i].match_details = this.match;
    }


  }




}
