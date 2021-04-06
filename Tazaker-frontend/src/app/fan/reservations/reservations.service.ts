import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { MyStrings } from 'src/app/classes/strings';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  host = new MyStrings();

  constructor(private http: HttpClient) { }

  getUserInfo():Observable<any>{
    const headers = { 'content-type': 'application/json',
    'Authorization': 'Bearer '+localStorage.getItem('token')}
    console.log(headers);


    return this.http.get<any>(this.host.serverhost+'api/auth/viewUserInfo',{'headers':headers});
  }

  cancelMatchReservation(ticket_id : number):Observable<any>{
    const headers = { 'content-type': 'application/json',
    'Authorization': 'Bearer '+localStorage.getItem('token')}
    const body ={ticket_id : ticket_id}

   // const body=JSON.stringify(pending);
    console.log(body)
    return this.http.delete(this.host.serverhost +'api/fan/cancelTicket' ,{'headers':headers})
  }

  /// not working
  async getMatchName(match_id : number){

    return await this.http.get<any>(this.host.serverhost+"api/unauth/viewMatches?match_id="+match_id).toPromise();
  }
}
