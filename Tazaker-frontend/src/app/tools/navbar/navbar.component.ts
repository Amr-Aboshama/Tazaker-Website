import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  id: number=parseInt( this.route.snapshot.params['id'] );

  constructor(private route: ActivatedRoute ) { }

  ngOnInit(): void {
  }

}
