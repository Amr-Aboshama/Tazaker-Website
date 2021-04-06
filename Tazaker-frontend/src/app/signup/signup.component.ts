import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  genders: Array<any> = ['M', 'F'];
  roles: Array<any> = ['Manager', 'Fan'];
  cities: Array<any> = ["Cairo", "Alexandria", "Aswan", "	Asyut", "	Beheira", "Beni Suef", "Cairo", "Dakahlia", "Damietta", "Faiyum", "Gharbia", "Giza", "Ismailia", "Kafr El Sheikh", "Luxor", "Matruh", "Minya", "Monufia", "New Valley", "North Sinai", "Port Said", "Qalyubia", "Qena", "Red Sea", "Sharqia", "Sohag", "South Sinai", "Suez"];

  constructor(private fb: FormBuilder,private dataService: AccountService,private router:Router) {
    this.signupForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      birthdate: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', [Validators.required,Validators.minLength(4), Validators.email]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      address: [''],
      city: ['', Validators.required],
      role: ['', Validators.required],
      }, {validators: this.checkPasswords});
  }

  checkPasswords(group: FormGroup) {
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;
    return password === confirmPassword ? null : { notSame: true }
  }

  ngOnInit(): void { }

  signUp(): void {
    this.dataService.userregistration(this.signupForm.value.username, this.signupForm.value.password, this.signupForm.value.confirmPassword,
                                    this.signupForm.value.firstname, this.signupForm.value.lastname, this.signupForm.value.birthdate,
                                    this.signupForm.value.gender, this.signupForm.value.city, this.signupForm.value.address, this.signupForm.value.email, this.signupForm.value.role)
    .pipe(first())
    .subscribe(
    data => {
    this.router.navigate(['/login']);
    },
    error => {
    // console.log(error)
    alert("Error in Signing up")
    });
  }
}
