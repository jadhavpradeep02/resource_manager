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
export class AllocationService {
  public static BaseUrl = "http://localhost:3000/";

  constructor(private http: HttpClient) { }

  getAllocationData() {
    return this.http.get(AllocationService.BaseUrl+'allocations', httpOptions).pipe(map((response) => response))
  }

  postAllocationdata(data: any){
    return this.http.post(AllocationService.BaseUrl+'allocations',data,httpOptions).pipe(map((response) => response));
  }
}
