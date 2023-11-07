import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CriteriaConfInterface } from '../model/criteriaConfiguration';

@Injectable({
  providedIn: 'root'
})
export class CriteriaConfService {

  private API_CONF = "http://localhost:8080/api/criteria-conf";

  constructor(private http : HttpClient) {}

  public deleteConfsByAutomatized(isAutomatized: string){
    return this.http.delete(this.API_CONF + "/deleteByAutomatized/"+isAutomatized);
  }

  public postAllCriteriaConfs(confs : CriteriaConfInterface[]) : Observable<any>{
    console.log("Post criteria confs");
    
    return this.http.post(this.API_CONF+'/saveConfs', confs);
  }
}
