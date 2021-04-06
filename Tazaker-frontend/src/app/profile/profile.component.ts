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
  password : FormGroup;

  cities: Array<any> = ["Cairo", "Alexandria", "Aswan", "	Asyut", "	Beheira", "Beni Suef", "Cairo", "Dakahlia", "Damietta", "Faiyum", "Gharbia", "Giza", "Ismailia", "Kafr El Sheikh", "Luxor", "Matruh", "Minya", "Monufia", "New Valley", "North Sinai", "Port Said", "Qalyubia", "Qena", "Red Sea", "Sharqia", "Sohag", "South Sinai", "Suez"];

  constructor(private HttpService:ProfileService , private fb: FormBuilder, private router: Router) {
    this.createProfile();
    this.updatePassword();

   }

  ngOnInit(): void {

      this.updateProfile()

  }

  createProfile(){

  this.editProfileForm=this.fb.group({
    username : [{value: '', disabled: true} , Validators.required],
    Password: [''],
    first_name: ['' ,  Validators.required],
    last_name: ['' ,  Validators.required],
    birthdate: ['' ,  Validators.required],
    gender: [''],
    city: ['' ,  Validators.required],
    address: ['' ,  Validators.required],
    email: [{value: '', disabled: true} ,  Validators.required],

    role: ['']
  });
  }

  updatePassword(){
    this.password = this.fb.group({
      old_password : ['' , [Validators.minLength(8) , Validators.required ]],
      new_password :  ['' ,[Validators.minLength(8) , Validators.required ]],
      new_password_confirmation : ['' , [Validators.minLength(8) , Validators.required ]]
    })
  }

  ProfileValues( profile : User){

    this.editProfileForm.patchValue({

      username : profile.username,
      Password: profile.Password,
      first_name: profile.first_name,
      last_name: profile.last_name,
      birthdate: profile.birthdate,
      gender: profile.gender,
      city: profile.city,
      address: profile.address,
      email: profile.email,
      role: profile.role

    })

  }

  updateProfile(){

    this.HttpService.getUserInfo()
      .subscribe(  data => {
        console.log(data.user),
        this.ProfileValues(data.user),
        (err: any) => console.log(err)


      }
      );
  }

  editProfile(){
    this.HttpService.editProfile(this.editProfileForm.getRawValue()).subscribe(data => {
      console.log(data)
      alert(" Data edited successfully "),
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate(['/profile']));
    }, error => {
      console.log(error),
      alert(" Ooopss !!! an Error has occured Please try again ")

    });
  }

  changePassword(){
    this.HttpService.changePassword(this.password).subscribe(data =>
       {console.log(data),
      alert("Password changed successfully !"),
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate(['/profile']));
      //this.router.red(['/profile'])

    }, error => {
        console.log(error),
        alert(" Password not entered correctly please retry !!")
      }



  )
  }



}
