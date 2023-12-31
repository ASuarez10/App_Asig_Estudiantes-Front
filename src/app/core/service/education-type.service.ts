import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EducationTypeInterface } from '../model/education-type';

@Injectable({
  providedIn: 'root'
})
export class EducationTypeService {

  //API URI for education types endpoint
  private API_EDUCATION_TYPE = "http://localhost:8080/api/educationTypes";

  constructor(private http : HttpClient) {}

  //Get request for all the education types names
  public getAllEducationTypesNames(): Observable<string[]>{
    return this.http.get<string[]>(this.API_EDUCATION_TYPE+"/names");
  }

}
