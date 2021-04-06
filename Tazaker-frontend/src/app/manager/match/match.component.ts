import { match } from './../../classes/match';
import { Component, OnInit } from '@angular/core';
import { MatchService } from './match.service';
import { FormBuilder , FormGroup , Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { stadium } from 'src/app/classes/stadium';
import { DatePipe, Time } from '@angular/common';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  match = new match();
  MatchId: number=parseInt( this.route.snapshot.params['id'] );
  EditMode = false;
  time : Time;

  Stadiums: stadium[];


  public matchForm : FormGroup;

  constructor(private fb: FormBuilder,private route: ActivatedRoute,private HttpService: MatchService, private router: Router) {
    //this.time = new Time();
    this.createMatch();
    this.getAllstadiums();

   }

  ngOnInit(): void {
    //get id of match to be able to edit it
    this.route.paramMap.subscribe(params => {
      const MatchId = this.MatchId;
      console.log("my match id is ", MatchId)
      if (MatchId) {
        this.EditMode = true;
        this.getMatch(MatchId);
      }
    });


  }

  addMatch() {
    this.HttpService.addMatch(this.matchForm.getRawValue())
      .subscribe(data => {

        console.log('i am the match data ',data),
        alert("match added successfully")
        this.router.navigate(['/home'])
      }, error => {
        alert("Error match couldn't be done please try another input")

      }
      )
  }

  getAllstadiums(){

    this.HttpService.getAllStadiums()
    .subscribe(
      data => {
        this.Stadiums = data.stadiums,
        (err: any) => console.log(err),
        console.log(this.Stadiums)
      });


  }

  createMatch(){
    this.matchForm = this.fb.group({
      home_team:['', Validators.required],
      away_team:['', Validators.required],
      match_venue:['' , Validators.required],
      date:['', Validators.required],
      time:['', Validators.required],
      main_referee:['', Validators.required],
      first_linesman:['', Validators.required],
      second_linesman:['', Validators.required],
      match_id:['']

    });
  }

  //edit
  getMatch( id: number) {
    console.log('received id :' , id)
    this.HttpService.getMatchbyid(id)
      .subscribe(  data => {
        console.log(data.matches[0]),
        this.editMatch(data.matches[0]),
        (err: any) => console.log(err)


      }
      );
  }

  editMatch(match: match) {
    console.log("Hi i am");

    this.matchForm.patchValue({
      match_id:match.id,
      home_team: match.home_team,
      away_team: match.away_team,
      match_venue:match.match_venue,
      date:match.date,
      time:match.time,
      main_referee:match.main_referee,
      first_linesman:match.first_linesman,
      second_linesman:match.second_linesman

    });

  }

  UpdateMatch(){
    this.HttpService.EditMatch(this.matchForm.getRawValue(),this.MatchId).subscribe(data => {
      console.log(data),
      alert(" match edited successfully")
    }, error => {
      console.log(error),
      alert("Match was not updated please try correct data")
    }
    );

  }


  ChooseMode(){
    if (!this.EditMode)
      this.addMatch();
    else
      this.UpdateMatch();
  }






}
