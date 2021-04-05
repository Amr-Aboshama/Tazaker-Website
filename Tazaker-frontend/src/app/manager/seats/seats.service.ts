import { MyStrings } from './../../classes/strings';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { seat } from 'src/app/classes/seat';

@Injectable({
  providedIn: 'root'
})
export class SeatsService {
  host = new MyStrings();
 // baseURL: string = "http://localhost:3000/";
 // serverURL: string ="http://f038e07fd417.ngrok.io/";

  constructor(private http: HttpClient) { }


  getStadiumbyid(id:number):Observable<any>{
    return this.http.get<any>(this.host.localhost+"stadium/"+id)
  }

  getSeatsforStadiumbyid(id: number):Observable<any>{
    return this.http.get<any>(this.host.localhost+"seats/"+id)
  }

  getSeatsOfStadium(id : number):Observable<any>{

    return this.http.get<any>(this.host.serverhost+'api/unauth/viewSeatsStatus'+'?match_id='+id)

  }

  reserveSeat(matchId : number , seat : seat): Observable<any> {
    const headers = { 'content-type': 'application/json',
    'Authorization': 'Bearer '+localStorage.getItem('token')}
    const bodyx =
    {
            "match_id": matchId,
            "seat_row": seat.seat_row,
            "seat_column": seat.seat_column
    }
    //const body=JSON.stringify(seat);
    console.log(headers);
    console.log(bodyx);
    return this.http.post(this.host.serverhost + 'api/fan/reserveTicket', bodyx,{'headers':headers})
  }

}
