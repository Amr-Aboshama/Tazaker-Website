import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-newnavbar',
  templateUrl: './newnavbar.component.html',
  styleUrls: ['./newnavbar.component.css']
})
export class NewnavbarComponent implements OnInit {

  id: number;
  constructor() {
    this.id = parseInt(localStorage.getItem('role'), 10);
    console.log('THE ID IS in navbar :' , this.id);

    if ( Number.isNaN(this.id)){
      this.id = 3;
      console.log('THE ID IS in Nan :' , this.id);

    }
   }

  ngOnInit(): void {
  }

}
