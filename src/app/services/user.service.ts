import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public static BaseUrl = "http://localhost:3000/";

  constructor(private http: HttpClient) { }

  getUsersData() {
    return this.http.get(UserService.BaseUrl+'employees', httpOptions).pipe(map((response) => response))
  }

  postUsersdata(data: any){
    return this.http.post(UserService.BaseUrl+'employees',data,httpOptions).pipe(map((response) => response));
  }
}
