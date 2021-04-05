import { match } from './../classes/match';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { HomeService } from './home.service';
import { User } from '../classes/User';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  items: any;
  Matches: match[];
  Users: User[];
  //id: number=parseInt( this.route.snapshot.params['id'] );
  id: number;


  constructor(private HttpService: HomeService ,private route: ActivatedRoute , private router: Router) {
    this.items = this.Matches;
    this.id = parseInt(localStorage.getItem('role'), 10);
    console.log('THE ID IS :' , this.id);
   }

  ngOnInit(): void {

    if (this.id != 0 || this.id == undefined  ){

    this.HttpService.getmatches().subscribe(
      data => {
        //do not forget to do this everywhere
        this.items = data.matches,
        this.Matches=this.items,

        (err: any) => console.log(err),
        console.log(this.id)
        console.log(this.items),
        console.log(this.Matches)

      });
    }
    else
    {
      this.RefreshApprovedUsers()

    }


  }


//for admin
removeUser(Userid: string){
  console.log(Userid);
  this.HttpService.removeUserbyid(Userid).subscribe(
    data => {
      (err: any) => console.log(err)

      this.RefreshApprovedUsers();


    });

}

RefreshApprovedUsers(){
  this.HttpService.getApprovedusers().subscribe(
    data => {
      this.Users = data.users,
      (err: any) => console.log(err),
      console.log(this.Users)
    });
}



}
