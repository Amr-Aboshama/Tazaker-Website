import { seat } from './../../classes/seat';
import { SeatsService } from './seats.service';
import { stadium } from 'src/app/classes/stadium';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { match } from 'src/app/classes/match';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.css']
})
export class SeatsComponent implements OnInit {

  Matchid: number=parseInt( this.route.snapshot.params['id'] );
  Stadium : stadium;
  ReservedSeats: seat[];
  StadiumSeats: seat[];
  Myseat : seat;

  Modalseat: seat;

  showModal = false;


  public ModalForm : FormGroup;


  constructor(private fb: FormBuilder,private HttpService: SeatsService ,private route: ActivatedRoute , private router: Router) {
    this.Modal();
   }

  ngOnInit(): void {
    //get stadium for dimensions
    this.HttpService.getSeatsOfStadium(this.Matchid)
      .subscribe( data => {
        this.Stadium=data,
        this.Stadium.column_count = data.length,
        this.Stadium.row_count = data.width,


        console.log(data.length),

        this.ReservedSeats=data.reserved_seats,
        (err: any) => console.log(err),
        console.log(data),
        console.log(this.ReservedSeats),
        this.generateStadiumSeats()
      }
      );
  }
generateStadiumSeats(){
  this.StadiumSeats = [];

  for(let i=1 ; i<= this.Stadium.column_count ; i++){
    for(let j=1 ; j <= this.Stadium.row_count ; j++){
        this.Myseat=new seat();
        this.Myseat.seat_column=i;
        this.Myseat.seat_row=j;
        this.Myseat.booked=false;
        //console.log(this.Myseat);
        this.StadiumSeats.push(this.Myseat);
    }

  }

  //map reserved seats
 for(let seats of this.StadiumSeats){

  for(let reserved of this.ReservedSeats){

    if(seats.seat_column == reserved.seat_column && seats.seat_row == reserved.seat_row){
      seats.booked =true;
      //seats=reserved;
    }

  }


 }
  console.log("final");
  console.log(this.StadiumSeats);


}

toggleModal(){
  this.showModal = !this.showModal;
}
////////////// Modal ///////////////////

Modal(){
  this.ModalForm = this.fb.group({
    Credit_number:['', [Validators.minLength(8), Validators.required]],
    PIN_number:['', [Validators.minLength(4), Validators.required]]
  });
}

ReserveTicket(){
  this.HttpService.reserveSeat(this.Matchid,this.Modalseat)
  .subscribe(data => {
    console.log(data),
    (err: any) => console.log(err)

  })
this.toggleModal();

}

saveClickedSeat(seat : seat){
  this.Modalseat=seat;
  console.log(this.Modalseat);

  this.toggleModal();

}



}
