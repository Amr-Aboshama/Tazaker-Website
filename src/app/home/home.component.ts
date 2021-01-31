import { match } from './../classes/match';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { HomeService } from './home.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  baseURL: string = "http://localhost:3000/";
  Matches: match[];
  id: number=parseInt( this.route.snapshot.params['id'] );



  constructor(private HttpService: HomeService ,private route: ActivatedRoute , private router: Router) { }

  ngOnInit(): void {

    this.HttpService.getmatches().subscribe(
      data => {
        this.Matches = data,
        (err: any) => console.log(err),
        console.log(this.Matches)
      });


  }



}
