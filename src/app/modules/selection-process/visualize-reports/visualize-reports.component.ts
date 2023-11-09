import { Component } from '@angular/core';
import { Page } from 'src/app/core/model/page';
import { SelectionProcess } from 'src/app/core/model/selection-process';
import { SelectionProcessService } from 'src/app/core/service/selection-process.service';

@Component({
  selector: 'app-visualize-reports',
  templateUrl: './visualize-reports.component.html',
  styleUrls: ['./visualize-reports.component.css']
})
export class VisualizeReportsComponent {

  //Variable that stores the rol from the browser local storage
  usuarioRol: string = '';

  currentPage: number = 0;

  pageSize: number = 2;

  isLastPage: boolean = false;

  //List with selection processes from page
  selectionProcesses: SelectionProcess[] = [];

  constructor(private selectionProcessService: SelectionProcessService){}

  ngOnInit(): void{
    this.usuarioRol = localStorage.getItem('ROL') as string;
    this.loadSelectionProcesses(this.currentPage,this.pageSize);
    
  }

  loadSelectionProcesses(page: number, size: number){
    this.selectionProcessService.getAllSelectionProcesses(page, size).subscribe((response: Page<SelectionProcess>) => {
      this.selectionProcesses = response.content;
      this.currentPage = page;
      this.isLastPage = response.last;
    });
  }

  nextPage(){
    this.loadSelectionProcesses(this.currentPage+1,this.pageSize);
  }

  previousPage(){
    this.loadSelectionProcesses(this.currentPage-1,this.pageSize);
  }

  printId(id:number){
    console.log(id);
  }

  downloadExcel(id_process:number){
    this.selectionProcessService.getSelectionProcessExcel(id_process).subscribe(response => {

      //Blob is a type for byte stream
      const blob = new Blob([response], {type: 'application/octet-stream'});

      //URL object for blob
      const url = window.URL.createObjectURL(blob);

      //Generate link to download file
      const a = document.createElement('a');
      a.href = url;
      a.download = 'SelectionProcess.xlsx'; //File name
      document.body.appendChild(a);

      //Simulates click to start download
      a.click();

      //Remove link and URL
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

    });
  }

}
