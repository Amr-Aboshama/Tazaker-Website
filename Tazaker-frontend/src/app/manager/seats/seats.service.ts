import { MyStrings } from './../../classes/strings';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { seat } from 'src/app/classes/seat';

@Injectable({
  providedIn: 'root'
})
export class SeatsService {
  host: MyStrings;
  baseURL: string = "http://localhost:3000/";

  constructor(private http: HttpClient) { }


  getStadiumbyid(id:number):Observable<any>{
    return this.http.get<any>(this.baseURL+"stadium/"+id)
  }

  getSeatsforStadiumbyid(id: number):Observable<any>{
    return this.http.get<any>(this.baseURL+"seats/"+id)
  }

  getSeatsOfStadium(id : number):Observable<any>{

    return this.http.get<any>("http://551aed329409.ngrok.io/"+'api/unauth/viewSeatsStatus'+'?match_id='+id)

  }

  reserveSeat(matchId : number , seat : seat): Observable<any> {
    const headers = { 'content-type': 'application/json',
                      'match_id': matchId.toString()
    }
    const body=JSON.stringify(seat);
    console.log(headers);
    console.log(body);
    return this.http.post(this.baseURL + 'match', body,{'headers':headers})
  }

}
