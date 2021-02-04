import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  username = '';
  email = '';
  firstname = '';
  lastname = '';
  address = '';
  password = '';
  confirmPassword = '';

  genders: Array<any> = ['Male', 'Female'];
  roles: Array<any> = ['Manager', 'Fan'];
  cities: Array<any> = ["Cairo", "Alexandria", "Aswan", "	Asyut", "	Beheira", "Beni Suef", "Cairo", "Dakahlia", "Damietta", "Faiyum", "Gharbia", "Giza", "Ismailia", "Kafr El Sheikh", "Luxor", "Matruh", "Minya", "Monufia", "New Valley", "North Sinai", "Port Said", "Qalyubia", "Qena", "Red Sea", "Sharqia", "Sohag", "South Sinai", "Suez"];
  
  valid = {
    username: true,
    firstname: true,
    lastname: true,
    address: true,
    email: true,
    password: true,
  };

  constructor() { 
    
  }

  ngOnInit(): void { }

  validate(type: string): void {
    const usernamePattern = /^[\w-.]*$/;
    const emailPattern = /\S+@\S+\.\S+/;

    if (type === 'username') {
      if (this.username.length < 5) {
        this.valid.username = false;
      } else {
        this.valid.username = usernamePattern.test(this.username);
      }
    } else if (type === 'email') {
      this.valid.email = emailPattern.test(this.email);
    } else if (type === ('confirmPassword' || 'password')) {
      if (this.password !== this.confirmPassword) {
        this.valid.password = false;
      } else {
        this.valid.password = true;
      }
    }
    console.log(this.valid)
  }

  onKey(event: any, type: string) {
    if (type === 'username') {
      this.username = event.target.value;
    } else if (type === 'email') {
      this.email = event.target.value;
    } else if (type === 'password') {
      this.password = event.target.value;
    } else if (type === 'confirmPassword') {
      this.confirmPassword = event.target.value;
    } else if (type === 'firstname'){
      this.firstname = event.target.value;
    } else if (type === 'lastname'){
      this.lastname = event.target.value;
    } else if (type === 'address'){
      this.firstname = event.target.value;
    }
    this.validate(type);
  }

}
