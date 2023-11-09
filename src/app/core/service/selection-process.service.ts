import { Injectable } from '@angular/core';
import { Page } from '../model/page';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SelectionProcess } from '../model/selection-process';

@Injectable({
  providedIn: 'root'
})
export class SelectionProcessService {

  private API_SELECTION_PROCESS = "http://localhost:8080/api/selection-process";

  constructor(private http: HttpClient) { }

  getAllSelectionProcesses(page: number, size: number): Observable<Page<SelectionProcess>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<Page<SelectionProcess>>(this.API_SELECTION_PROCESS, {params});
  }

  //Service to get selection process by id in excel file
  getSelectionProcessExcel(id_process:number): Observable<any>{
    return this.http.get(this.API_SELECTION_PROCESS+'/downloadProcess/'+id_process, 
    {
      responseType: 'arraybuffer',
      headers: new HttpHeaders().append('Accept', 'application/octet-stream')
    });
  }

}
