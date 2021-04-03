import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  
  export class SignUpService {
  
    baseURL: string = "http://localhost:3000/";
  
    constructor(private http: HttpClient) { }
  
    
    getmatches():Observable<any>{
      return this.http.get<any>(this.baseURL+'match')
    ;}
  
    //------------ for admins ------------------------//
    getApprovedusers():Observable<any>{
      return this.http.get<any>(this.baseURL+'user');
    }
  
    removeUserbyid(id:number):Observable<any>
    {
      return this.http.delete(this.baseURL + 'user/'+id);
    }
  }
  