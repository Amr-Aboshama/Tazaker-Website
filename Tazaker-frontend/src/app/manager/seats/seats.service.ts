import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeatsService {

  baseURL: string = "http://localhost:3000/";

  constructor(private http: HttpClient) { }


  getStadiumbyid(id:number):Observable<any>{
    return this.http.get<any>(this.baseURL+"stadium/"+id)
  }

  getSeatsforStadiumbyid(id: number):Observable<any>{
    return this.http.get<any>(this.baseURL+"seats/"+id)
  }

}
