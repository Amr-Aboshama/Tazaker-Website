import { MyStrings} from './../../classes/strings';
import { match } from './../../classes/match';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  host = new MyStrings();

  //baseURL: string = "http://localhost:3000/";

  constructor(private http: HttpClient) { }

  addMatch(match:match): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(match);
    console.log(body)
    return this.http.post(this.host.localhost + 'match', body,{'headers':headers})
  }

  getAllStadiums():Observable<any>{
    return this.http.get<any>(this.host.localhost+"stadium")
  }


  getMatchbyid(id):Observable<any>{
    return this.http.get<any>(this.host.localhost+"match/"+id)
  }

  EditMatch(match:match,id:number):Observable<any>{
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(match);
    console.log(body)
    return this.http.put(this.host.localhost + 'match/'+id , body,{'headers':headers})
  }





}
