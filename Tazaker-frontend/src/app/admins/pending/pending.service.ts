import { MyStrings } from './../../classes/strings';
import { pending } from './../../classes/pending';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PendingService {

  host: MyStrings;
  baseURL: string = "http://localhost:3000/";

  constructor(private http: HttpClient) { }


  approveORnot(pendingManager: pending):Observable<any>{
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(pending);
    console.log(body)
    return this.http.put(this.baseURL + 'match/'+pendingManager , body,{'headers':headers})
  }

  getPendingUsers():Observable<any>{
    return this.http.get<any>(this.host.localhost+'pending');
  }

  removeRequestbyid(id:number):Observable<any>
  {
    return this.http.delete(this.baseURL + 'pending/'+id);
  }

}
