import { match } from './../../classes/match';
import { Component, OnInit } from '@angular/core';
import { MatchService } from './match.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  match = new match();

  matchForm : any;

  constructor(private fb: FormBuilder,private route: ActivatedRoute,private HttpService: MatchService) { }

  ngOnInit(): void {



  }

  addMatch() {
    this.HttpService.addMatch(this.match)
      .subscribe(data => {
        console.log(data)
      })
  }



}
