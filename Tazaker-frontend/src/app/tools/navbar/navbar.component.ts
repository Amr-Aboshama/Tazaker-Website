import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  id: number;

  constructor(private route: ActivatedRoute ) {
    this.id = parseInt(localStorage.getItem('role'), 10);
    console.log('THE ID IS in navbar :' , this.id);
  }

  ngOnInit(): void {
  }

}
