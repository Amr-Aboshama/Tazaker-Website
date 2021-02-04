import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  baseURL: string = "http://localhost:3000/";
  constructor(private http: HttpClient) { }

  getUserInfobyid(username: number):Observable<any>{
    return this.http.get<any>(this.baseURL+"user/"+username);
  }


}
