import { FormGroup } from '@angular/forms';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { generate } from 'rxjs';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MyStrings } from '../classes/strings';
import { User } from '../classes/User';

@Injectable({
providedIn: 'root'
})

export class ProfileService {
host = new MyStrings();

constructor(private http : HttpClient) { }

getUserInfo():Observable<any>{
    const headers = { 'content-type': 'application/json',
    'Authorization': 'Bearer '+localStorage.getItem('token')}
    console.log(headers);


    return this.http.get<any>(this.host.serverhost+'api/auth/viewUserInfo',{'headers':headers});
  }

 // /api/auth/editUserInfo

  editProfile(Profile : User):Observable<any>{
    const headers = { 'content-type': 'application/json','Authorization': 'Bearer '+localStorage.getItem('token')}
    const body=JSON.stringify(Profile);
    console.log(body)
    return this.http.put(this.host.serverhost + 'api/auth/editUserInfo' , body,{'headers':headers})
  }

  changePassword( pass: FormGroup):Observable<any>{
      const headers = { 'content-type': 'application/json','Authorization': 'Bearer '+localStorage.getItem('token')};
      const passString= pass.getRawValue();

      const body=JSON.stringify(passString);
      console.log(body)
      return this.http.post(this.host.serverhost + 'api/auth/changePassword' , body,{'headers':headers})

  }

// @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
// public editProfile() {

//     }
}
