import { User } from './../../classes/User';
import { PendingService } from './pending.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css']
})
export class PendingComponent implements OnInit {

  PendingUsers: User[];
  // PendingUsers: User[];

  constructor(private HttpService: PendingService,private route: ActivatedRoute , private router: Router) { }

  ngOnInit(): void {

   this.refreshPendingUsers();

  }

  removeRequest(Userid: number){
    this.HttpService.removeRequestbyid(Userid).subscribe(
      data => {
        console.log(data),
        this.refreshPendingUsers();
        (err: any) => console.log(err)
      });
    }

    refreshPendingUsers(){
      this.HttpService.getPendingUsers().subscribe(
        data => {
          this.PendingUsers = data,
          (err: any) => console.log(err),
          console.log(this.PendingUsers)
        });
    }



}
