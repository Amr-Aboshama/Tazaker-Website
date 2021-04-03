import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { SignUpService } from '../signup/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  now = new Date();
  _username = '';
  _email = '';
  _firstname = '';
  _lastname = '';
  _address = '';
  _password = '';
  _confirmPassword = '';
  _birthdate = '';

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

  constructor(private fb: FormBuilder,private dataService: SignUpService,private router:Router) {
    this.signupForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      birthdate: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', [Validators.required,Validators.minLength(4), Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      city: ['', Validators.required],
      address: [''],
      role: ['', Validators.required],
      });
  }

  ngOnInit(): void { }

  signUp(signUpForm): void {
    console.log(signUpForm.value.username);
    console.log(signUpForm.value.gender);
  }
  validate(type: string): void {
    const usernamePattern = /^[\w-.]*$/;
    const emailPattern = /\S+@\S+\.\S+/;

    if (type === 'username') {
      if (this._username.length < 4) {
        this.valid.username = false;
      } else {
        this.valid.username = usernamePattern.test(this._username);
      }
    } else if (type === 'email') {
      this.valid.email = emailPattern.test(this._email);
    } else if (type === ('confirmPassword' || 'password')) {
      if (this._password !== this._confirmPassword) {
        this.valid.password = false;
      } else {
        this.valid.password = true;
      }
    }
    
    //console.log(this.valid)
  }

  onKey(event: any, type: string) {
    if (type === 'username') {
      this._username = event.target.value;
    } else if (type === 'email') {
      this._email = event.target.value;
    } else if (type === 'password') {
      this._password = event.target.value;
    } else if (type === 'confirmPassword') {
      this._confirmPassword = event.target.value;
    } else if (type === 'firstname'){
      this._firstname = event.target.value;
    } else if (type === 'lastname'){
      this._lastname = event.target.value;
    } else if (type === 'address'){
      this._firstname = event.target.value;
    }
    this.validate(type);
  }

}
