import { match } from './../../classes/match';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  baseURL: string = "http://localhost:3000/";

  constructor(private http: HttpClient) { }

  addMatch(match:match): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(match);
    console.log(body)
    return this.http.post(this.baseURL + 'match', body,{'headers':headers})
  }

  getMatchbyid(id):Observable<any>{
    return this.http.get<any>(this.baseURL+"match/"+id)
  }

  EditMatch(match:match,id:number):Observable<any>{
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(match);
    console.log(body)
    return this.http.put(this.baseURL + 'match/'+id , body,{'headers':headers})
  }


}
