import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CriterionInterface } from '../model/criterion';

@Injectable({
  providedIn: 'root'
})
export class CriterionService {

  //API URI for criteria endpoint
  private API_CRITERIA = "http://localhost:8080/api/criteria";

  constructor(private http : HttpClient) {}

  //Get request for all the criteria
  public getAllCriteria(): Observable<CriterionInterface[]>{
    return this.http.get<CriterionInterface[]>(this.API_CRITERIA);
  }

}
