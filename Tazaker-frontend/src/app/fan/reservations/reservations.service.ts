import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MyStrings } from 'src/app/classes/strings';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  host = new MyStrings();


 // baseURL: string = "http://localhost:3000/";
  constructor(private http: HttpClient) { }

  getUserInfobyid(username: number):Observable<any>{
    return this.http.get<any>(this.host.localhost+"user/"+username);
  }


}
