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

  id: number=parseInt( this.route.snapshot.params['id'] );
  User : User;

  constructor(private HttpService: ReservationsService ,private route: ActivatedRoute , private router: Router) { }

  ngOnInit(): void {
    this.HttpService.getUserInfobyid(1)
    .subscribe( data => {
      this.User = data,
      (err: any) => console.log(err),
      console.log(this.User)
    }
    );
  }


}
