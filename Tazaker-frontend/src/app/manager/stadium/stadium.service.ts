import { MyStrings } from './../../classes/strings';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { stadium } from 'src/app/classes/stadium';

@Injectable({
  providedIn: 'root'
})
export class StadiumService {
  host = new MyStrings();

 // baseURL: string = "http://localhost:3000/";


  constructor(private http: HttpClient) { }

  addStadium(stadium: stadium): Observable<any> {
    const headers = { 'Content-Type': 'application/json',
    'Authorization': 'Bearer '+localStorage.getItem('token')}
    //const body=JSON.stringify(stadium);
    //console.log(body)
    const body = { name:stadium.name,length: stadium.row_count,width: stadium.column_count }

    console.log(body)
    return this.http.post<any>(this.host.serverhost + 'api/manager/addStadium',body ,{'headers':headers})
  }

}
