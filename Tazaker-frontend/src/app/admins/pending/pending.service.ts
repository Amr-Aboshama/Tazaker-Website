import { MyStrings } from './../../classes/strings';
import { pending } from './../../classes/pending';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PendingService {

  host = new MyStrings();
 // baseURL: string = "http://localhost:3000/";

  constructor(private http: HttpClient) { }


  approveORnot(username : string , approval : number):Observable<any>{
    const headers = { 'content-type': 'application/json',
    'Authorization': 'Bearer '+localStorage.getItem('token')}
    const body ={username : username, approve : approval }
   // const body=JSON.stringify(pending);
    console.log(body)

    return this.http.put(this.host.serverhost +'api/admin/approveOrDisapproveManager' , body,{'headers':headers})
  }

  getPendingUsers():Observable<any>{
    const headers = { 'content-type': 'application/json',
    'Authorization': 'Bearer '+localStorage.getItem('token')}

    return this.http.get<any>(this.host.serverhost+'api/admin/showNonApprovedManagers',{'headers':headers});
  }



}
