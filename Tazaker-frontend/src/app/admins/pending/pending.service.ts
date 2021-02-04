import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PendingService {

  baseURL: string = "http://localhost:3000/";

  constructor(private http: HttpClient) { }



  getPendingUsers():Observable<any>{
    return this.http.get<any>(this.baseURL+'pending');
  }

  removeRequestbyid(id:number):Observable<any>
  {
    return this.http.delete(this.baseURL + 'pending/'+id);
  }

}
