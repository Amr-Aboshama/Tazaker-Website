import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { stadium } from 'src/app/classes/stadium';

@Injectable({
  providedIn: 'root'
})
export class StadiumService {

  baseURL: string = "http://localhost:3000/";


  constructor(private http: HttpClient) { }

  addStadium(stadium: stadium): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(stadium);
    console.log(body)
    return this.http.post(this.baseURL + 'stadium', body,{'headers':headers})
  }

}
