import { User } from './../classes/User';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ProfileService } from './profile.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  EditMode = false;
  profile : User ;
  editProfileForm: FormGroup;

  cities: Array<any> = ["Cairo", "Alexandria", "Aswan", "	Asyut", "	Beheira", "Beni Suef", "Cairo", "Dakahlia", "Damietta", "Faiyum", "Gharbia", "Giza", "Ismailia", "Kafr El Sheikh", "Luxor", "Matruh", "Minya", "Monufia", "New Valley", "North Sinai", "Port Said", "Qalyubia", "Qena", "Red Sea", "Sharqia", "Sohag", "South Sinai", "Suez"];

  constructor(private HttpService:ProfileService , private fb: FormBuilder) { }

  ngOnInit(): void {

    this.HttpService.getUserInfo().subscribe(data =>{
      this.profile = data.user,
      console.log(data),
      (err: any) => console.log(err)
    })
  }

  createProfile(){

  this.editProfileForm=this.fb.group({
    username : ['' , Validators.required],
    Password: ['' ],
    first_name: [this.profile.username],
    last_name: [''],
    birthdate: [''],
    gender: [''],
    city: [''],
    address: [''],
    email: [''],
    id : [''], //id is the role {0 => 'Admin', 1 => 'Manager' , 2 => 'Fan'}
    role: ['']
  })
  }

}
