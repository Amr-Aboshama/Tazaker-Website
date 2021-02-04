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
  MatchId: number=parseInt( this.route.snapshot.params['id'] );
  EditMode = false;


  public matchForm : FormGroup;

  constructor(private fb: FormBuilder,private route: ActivatedRoute,private HttpService: MatchService) {

    this.createMatch();

   }

  ngOnInit(): void {
    //get id of match to be able to edit it
    this.route.paramMap.subscribe(params => {
      const MatchId = this.MatchId;
      if (MatchId) {
        this.EditMode = true;
        this.getMatch(MatchId);
      }
    });
  }

  addMatch() {
    this.HttpService.addMatch(this.matchForm.getRawValue())
      .subscribe(data => {
        console.log(data),
        (err: any) => console.log(err)

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

  //edit
  getMatch( id: number) {
    this.HttpService.getMatchbyid(id)
      .subscribe(
        (match: match) => this.editMatch(match),
        (err: any) => console.log(err)
      );
  }

  editMatch(match: match) {
    this.matchForm.patchValue({
      Home_team: match.Home_team,
      Away_team: match.Away_team,
      Match_venue:match.Match_venue,
      Date:match.Date,
      Time:match.Time,
      Main_referee:match.Main_referee,
      First_linesman:match.First_linesman,
      Second_linesman:match.Second_linesman
    });

  }

  UpdateMatch(){
    this.HttpService.EditMatch(this.matchForm.getRawValue(),this.MatchId).subscribe(data => {
      console.log(data)
    });

  }


  ChooseMode(){
    if (!this.EditMode)
      this.addMatch();
    else
      this.UpdateMatch();
  }






}
