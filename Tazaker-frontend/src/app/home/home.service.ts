import { MyStrings } from './../classes/strings';
import { User } from './../classes/User';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HomeService {

  host = new MyStrings();

 // baseURL: string = "http://localhost:3000/";
 // serverURL: string ="http://f038e07fd417.ngrok.io/";

  constructor(private http: HttpClient) { }

  getmatches():Observable<any>{
    return this.http.get<any>(this.host.serverhost+'api/unauth/viewMatches');}

  //------------ for admins ------------------------//
  getApprovedusers():Observable<any>{
    return this.http.get<any>(this.host.localhost+'user');
  }

  removeUserbyid(id:number):Observable<any>
  {
    return this.http.delete(this.host.localhost + 'user/'+id);
  }

}
