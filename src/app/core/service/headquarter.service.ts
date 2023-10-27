import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HeadquarterInterface } from '../model/headquarter';

@Injectable({
  providedIn: 'root'
})
export class HeadquarterService {

  //API URI for headquartes endpoint
  private API_HEADQUARTERS = "http://localhost:8080/api/headquarters";

  constructor(private http : HttpClient) {}

  //Get request for all the headquarters
  public getAllHeadquarters(): Observable<HeadquarterInterface[]>{
    return this.http.get<HeadquarterInterface[]>(this.API_HEADQUARTERS);
  }

  //Get request for all the education types names
  public getAllHeadquartersNames(): Observable<string[]>{
    return this.http.get<string[]>(this.API_HEADQUARTERS+"/names");
  }
}
