import { Component } from '@angular/core';
import { CandidateInterface } from 'src/app/core/model/candidate';
import { MessageService } from 'primeng/api';
import { CandidateService } from 'src/app/core/service/candidate.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-candidates-loading',
  templateUrl: './candidates-loading.component.html',
  styleUrls: ['./candidates-loading.component.css']
})
export class CandidatesLoadingComponent {

  //Variable that stores the rol from the browser local storage
  usuarioRol: string = '';

  //Variable that stores file selected
  selectedFile: File | undefined;

  //Variable that stores the HTTP response status
  httpResponseStatus : number = 0;

  constructor(private messageService: MessageService, private candidateService : CandidateService) {}

  ngOnInit(): void{
    this.usuarioRol = localStorage.getItem('ROL') as string;
  }
  
  //Method to store the file selected into a variable
  onFileSelect(event: any): void {
    this.selectedFile = event.files[0] as File;
    this.messageService.add({severity: 'info', summary: 'Archivo seleccionado', detail: this.selectedFile.name});
    console.log(this.selectedFile);
  }

  //Method to read and send candidate information
  onUpload(event: any): void {

    console.log("Entra a onUpload")
    if(this.selectedFile){ //Se pone la condicion porque reader.readAsText() espera un parametro tipo Blob que pide asegurarse de que el archivo exista
      const reader = new FileReader();  
      reader.onload = () => {

        const fileContent = reader.result as string;
        const fileLines = fileContent.split('\n');

        const candidateList : CandidateInterface[] = [];

        try{

          fileLines.forEach(line => {
            const fields = line.split(',');

            if(fields.length < 4){
              throw new Error('Empty line. Possible file end. End of loop')
            }

            //console.log(fields)
            const candidate : CandidateInterface = {
              id_candidate : fields[0].trim(),
              name : fields[1].trim(),
              lastname: fields[2].trim(),
              age : parseInt(fields[7].trim()),
              city : fields[4].trim(),
              estate : fields[5].trim(),
              icfes_general : parseInt(fields[6].trim()),
              id_type : fields[8].trim(),
              sex : fields[3].trim(),
              headquartercareer : {
                  id_headquarter_career : parseInt(fields[10].trim()) 
              },
              education_type : {
                id_education_type : parseInt(fields[9].trim()) 
              }
            }

            console.log(candidate)

            candidateList.push(candidate);

          });

        } catch(error){

        }

        this.candidateService.postCandidates(candidateList).subscribe(data => console.log(data));
      
        //this.candidateService.postCandidates(candidateList).subscribe(data => {console.log(data);this.httpResponseStatus = data.status;});

      };

      reader.readAsText(this.selectedFile);

    }

    console.log('Upload completed')

  }//end onUpload()

}
