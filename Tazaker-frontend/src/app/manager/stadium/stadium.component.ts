import { stadium } from './../../classes/stadium';
import { Component, OnInit } from '@angular/core';
import { StadiumService } from './stadium.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stadium',
  templateUrl: './stadium.component.html',
  styleUrls: ['./stadium.component.css']
})
export class StadiumComponent implements OnInit {

  stadium= new stadium();


  constructor(private route: ActivatedRoute,private HttpService: StadiumService) { }

  ngOnInit(): void {
  }

  addStadium() {
    this.HttpService.addStadium(this.stadium)
      .subscribe(data => {
        console.log(data)
      })
  }

}
