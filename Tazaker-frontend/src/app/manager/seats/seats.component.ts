import { seats } from './../../classes/seats';
import { SeatsService } from './seats.service';
import { stadium } from 'src/app/classes/stadium';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { match } from 'src/app/classes/match';

interface seat{
  Taken: boolean;
}
@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.css']
})
export class SeatsComponent implements OnInit {

  id: number=parseInt( this.route.snapshot.params['id'] );
  StadiumId: number=parseInt( this.route.snapshot.params['stadiumid'] );
  Stadium : stadium;

  //from where do we get id of stadium
  public length = 6;
  public width = 4;

  seats : seat[] = [ {Taken : false},{Taken : false},{Taken : false},{Taken : false},{Taken : false},{Taken : false},
    {Taken : false},{Taken : false},{Taken : false},{Taken : false},{Taken : false},
    {Taken : false},{Taken : false},{Taken : false},{Taken : false},{Taken : false},
    {Taken : false},{Taken : false},{Taken : false},{Taken : false},{Taken : false},
    {Taken : false},{Taken : false},{Taken : false}

  ]

  constructor(private HttpService: SeatsService ,private route: ActivatedRoute , private router: Router) { }

  ngOnInit(): void {
    //get stadium for dimensions
    this.HttpService.getStadiumbyid(this.StadiumId)
      .subscribe( data => {
        this.Stadium = data,
        (err: any) => console.log(err),
        console.log(this.Stadium)
      }
      );



  }





}
