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
export class ProjectsService {
  public static BaseUrl = "http://localhost:3000/";

  constructor(private http: HttpClient) { }

  getProjectData() {
    return this.http.get(ProjectsService.BaseUrl+'projects', httpOptions).pipe(map((response) => response))
  }

  postProjectdata(data: any){
    return this.http.post(ProjectsService.BaseUrl+'projects',data,httpOptions).pipe(map((response) => response));
  }

  deleteProjectdata(data: any){
    return this.http.delete(ProjectsService.BaseUrl+'items?project_id='+data.id, httpOptions).pipe(map((response) => response));
  }
}
