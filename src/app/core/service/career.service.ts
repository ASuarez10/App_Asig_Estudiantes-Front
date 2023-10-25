import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CareerInterface } from '../model/career';

@Injectable({
  providedIn: 'root'
})
export class CareerService {

  //API URI for careers endpoint
  private API_CAREERS = "http://localhost:8080/api/careers";

  constructor(private http : HttpClient) {}

  //Get request for all the careers
  public getAllCareers(): Observable<CareerInterface[]>{
    return this.http.get<CareerInterface[]>(this.API_CAREERS);
  }

}
