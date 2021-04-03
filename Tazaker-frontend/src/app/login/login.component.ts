import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  angForm: FormGroup;
  constructor(private fb: FormBuilder, private dataService: AccountService, private router:Router) {
    this.angForm = this.fb.group({
      username: ['', [Validators.required,Validators.minLength(4)]],
      password: ['', [Validators.required , Validators.minLength(8)]]
      });
  }

  ngOnInit(): void {
  }

  login(angForm1)
  {
  this.dataService.userlogin(angForm1.value.username,angForm1.value.password)
  .pipe(first())
  .subscribe(
  data => {
  //const redirect = this.dataService.redirectUrl ? this.dataService.redirectUrl : '/api/unauth/signIn';
  this.router.navigate(['/home']);
  },
  error => {
  console.log(error)
  alert("User name or password is incorrect")
  });
  }
  get username() { return this.angForm.get('username'); }
  get password() { return this.angForm.get('password'); }
}
