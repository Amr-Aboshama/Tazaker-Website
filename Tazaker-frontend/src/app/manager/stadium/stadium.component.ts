import { stadium } from './../../classes/stadium';
import { Component, OnInit } from '@angular/core';
import { StadiumService } from './stadium.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-stadium',
  templateUrl: './stadium.component.html',
  styleUrls: ['./stadium.component.css']
})
export class StadiumComponent implements OnInit {

  stadium= new stadium();


  constructor(private route: ActivatedRoute,private HttpService: StadiumService , private router:Router) { }

  ngOnInit(): void {
  }

  addStadium() {
    this.HttpService.addStadium(this.stadium)
      .subscribe(data => {
        console.log(data),
        alert("Stadium added successfully !"),
        this.router.navigate(['/home'])
      }, error => {
        console.log(error),
        alert("Stadium already exists !!  ")
      })
  }

}
