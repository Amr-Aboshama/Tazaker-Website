import { Injectable, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { generate } from 'rxjs';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MyStrings } from '../classes/strings';

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

@Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
public editProfile() {
    
    }
}
