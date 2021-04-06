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
    const headers = {'content-type': 'application/json',
    'Authorization': 'Bearer '+localStorage.getItem('token')}

    const body={
    home_team: match.home_team,
    away_team: match.away_team,
    match_venue: match.match_venue,
    date: match.date,
    time:match.time,
    main_referee: match.main_referee,
    first_linesman: match.first_linesman,
    second_linesman: match.second_linesman
    };
    console.log('The body in service ',body)

    return this.http.post(this.host.serverhost + 'api/manager/createMatch',body ,{'headers':headers})
  }

  getAllStadiums():Observable<any>{
    const headers = { 'content-type': 'application/json','Authorization': 'Bearer '+localStorage.getItem('token')}

    return this.http.get<any>(this.host.serverhost+"api/manager/viewStadiums",{'headers':headers})
  }


  getMatchbyid(match_id : number):Observable<any>{
    return this.http.get<any>(this.host.serverhost+"api/unauth/viewMatches?match_id="+match_id)
  }
  ////////////////////////////////


  EditMatch(match:match,id:number):Observable<any>{
    const headers = { 'content-type': 'application/json','Authorization': 'Bearer '+localStorage.getItem('token')}
    const body=JSON.stringify(match);
    console.log(body)
    return this.http.put(this.host.serverhost + 'api/manager/editMatch' , body,{'headers':headers})
  }





}
