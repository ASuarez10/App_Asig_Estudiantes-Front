import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CandidateInterface } from '../model/candidate';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  //API URI for candidates endpoint
  private API_CANDIDATES = "http://localhost:8080/api/candidates";

  constructor(private http : HttpClient) {}

  //Post request to save a list of candidates
  public postCandidates(candidateList : CandidateInterface[]) : Observable<any>{
    return this.http.post(this.API_CANDIDATES+"/saveCandidates", candidateList);
  }

  //Get request for all the candidates cities
  public getAllCandidatesCities(): Observable<string[]>{
    return this.http.get<string[]>(this.API_CANDIDATES+"/cities");
  }

  //Get request for all the candidates estates
  public getAllCandidatesEstates(): Observable<string[]>{
    return this.http.get<string[]>(this.API_CANDIDATES+"/estates");
  }

  //Get request for all the candidates sexes
  public getAllCandidatesSexes(): Observable<string[]>{
    return this.http.get<string[]>(this.API_CANDIDATES+"/sexes");
  }

}
