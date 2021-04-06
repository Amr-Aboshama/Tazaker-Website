import { Injectable, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Users } from './users';
import { MyStrings } from './classes/strings';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { generate } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
providedIn: 'root'
})

export class AccountService {
host = new MyStrings();
redirectUrl: string;
baseUrl:string = "http://localhost:3000/";


@Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
constructor(private httpClient : HttpClient) { }
public userlogin(username, password) {

  const body={ 
    username : username,
    password: password 
  }

  console.log(body)
  return this.httpClient.post<any>(this.host.serverhost + 'api/unauth/signIn', body)
    .pipe(map(Users => {
      console.log(Users.token);
      this.setToken(Users.token);
      
      var role = 2;
      if ( Users.role == 'Admin') {
        role = 0;
      }
      else if (Users.role == 'Manager'){
        role = 1;
      }
      localStorage.setItem('role', role.toString());
      console.log(localStorage.getItem('role'));
      console.log(localStorage.getItem('token'));
      this.getLoggedInName.emit(true);
      return Users;
  }));
}

//Sign out
public logout(){
  const headers = {'Authorization': 'Bearer '+localStorage.getItem('token')}
  this.httpClient.get<any>(this.host.serverhost + 'api/auth/signOut', {'headers': headers});
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  return;
}

//sign up
public userregistration(username, pwd, confPwd, fname, lname, bdate, gen, city, address, email, role) {
  const body = {
    username: username,
    password: pwd,
    password_confirmation: confPwd,
    email: email,
    first_name: fname,
    last_name: lname,
    birthdate: bdate,
    gender: gen,
    address: address,
    role: role,
    city: city
  }

return this.httpClient.post<any>(this.host.serverhost + 'api/unauth/signUp', body);
}

//token
setToken(token: string) {
localStorage.setItem('token', token);
}
getToken() {
return localStorage.getItem('token');
}
deleteToken() {
localStorage.removeItem('token');
}
isLoggedIn() {
  const usertoken = this.getToken();
  if (usertoken != null) {
  return true
    }
  return false;
  }
}
