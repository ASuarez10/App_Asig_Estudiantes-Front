import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CandidateInterface } from '../model/candidate';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  private API_CANDIDATES = "http://localhost:8080/api/candidates/saveCandidates";

  constructor(private http : HttpClient) {}

  public postCandidates(candidateList : CandidateInterface[]) : Observable<any>{

    return this.http.post(this.API_CANDIDATES, candidateList);

  }

}
