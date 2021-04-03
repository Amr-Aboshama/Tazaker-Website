import { Injectable, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Users } from './users';
import { MyStrings } from './classes/strings';

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

const body={ username : username,
            password: password}

console.log(body)
return this.httpClient.post<any>(this.host.serverhost + 'api/unauth/signIn', body)

.pipe(map(Users => {
console.log(Users.token);
this.setToken(Users.token);
//if_
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

//sign up
public userregistration(name,email,pwd) {
return this.httpClient.post<any>(this.baseUrl + '/register.php', { name,email, pwd })
.pipe(map(Users => {
return Users;
}));
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
