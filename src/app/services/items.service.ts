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
export class ItemsService {

  public static BaseUrl = "http://localhost:3000/";

  constructor(private http: HttpClient) { }

  getItemsData() {
    return this.http.get(ItemsService.BaseUrl+'items', httpOptions).pipe(map((response) => response))
  }

  postItemdata(data: any){
    return this.http.post(ItemsService.BaseUrl+'items',data,httpOptions).pipe(map((response) => response));
  }

  deleteItemdata(data: any){
    return this.http.delete(ItemsService.BaseUrl+'items?item_id='+data.id, httpOptions).pipe(map((response) => response));
  }
}
