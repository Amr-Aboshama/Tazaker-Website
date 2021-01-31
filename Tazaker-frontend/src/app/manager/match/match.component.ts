import { match } from './../../classes/match';
import { Component, OnInit } from '@angular/core';
import { MatchService } from './match.service';
import { FormBuilder , FormGroup , Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  match = new match();

  public matchForm : FormGroup;

  constructor(private fb: FormBuilder,private route: ActivatedRoute,private HttpService: MatchService) {

    this.createMatch();

   }

  ngOnInit(): void {



  }

  addMatch() {
    this.HttpService.addMatch(this.matchForm.getRawValue())
      .subscribe(data => {
        console.log(data)
      })
  }

  createMatch(){
    this.matchForm = this.fb.group({
      Home_team:['', Validators.required],
      Away_team:['', Validators.required],
      Match_venue:[''],
      Date:['', Validators.required],
      Time:['', Validators.required],
      Main_referee:[''],
      First_linesman:[''],
      Second_linesman:['']
    });
  }



}
