import { Component } from '@angular/core';
import { CriterionInterface } from 'src/app/core/model/criterion';
import { CriteriaConfInterface } from 'src/app/core/model/criteriaConfiguration';
import { CriteriaDataService } from 'src/app/core/service/criteria-data.service';
import { CriterionService } from 'src/app/core/service/criterion.service'; 
import { CriteriaConfService } from 'src/app/core/service/criteria-conf.service';
import { CandidateService } from 'src/app/core/service/candidate.service';
import { concatMap, forkJoin, switchMap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-execution',
  templateUrl: './execution.component.html',
  styleUrls: ['./execution.component.css']
})
export class ExecutionComponent {

  //Variable that stores the rol from the browser local storage
  usuarioRol: string = '';

  scheduleTime: string = '';

  showTime: boolean = true;

  //List of all criteria from the DB
  criteriaListDB: CriterionInterface[] = [];

  //List with the options selected by user for every criterion.
  multiSelectedCriteriaOptions: { [key: string]: string[] } = {};
  //List with the options selected for every quantitative criterion.
  selectedQuantitativeOptions: { [key: string]: {optionSelected: string, value: number } } = {};

  //List with the percentage por each criterion
  percentagesEntered: { [key: string]: number } = {};

  //Dictionary with the information of the criteria priorization where the key is the name of the option for qualitative criteria and the name of the criterion if its
  //quantitative and the value of the priority.
  priorization: { [key: string]: {id:string, value: number} } = {};

  //List of criteria configuration to send information of priorization
  criteriaConf: CriteriaConfInterface[] = [];

  constructor(private criteriaDataService: CriteriaDataService, private criterionService : CriterionService, private criteriaConfService: CriteriaConfService,
              private candidateService: CandidateService, private router: Router){}

  ngOnInit(): void{
    this.usuarioRol = localStorage.getItem('ROL') as string;

    this.multiSelectedCriteriaOptions = this.criteriaDataService.getMultiSelectedCriteriaOptions();
    console.log(this.multiSelectedCriteriaOptions);
    
    
    this.selectedQuantitativeOptions = this.criteriaDataService.getSelectedQuantitativeOptions();

    this.percentagesEntered = this.criteriaDataService.getPercentagesEntered();

    this.priorization = this.criteriaDataService.getPriorization();

    this.criterionService.getAllCriteria().subscribe(criteria => {
      this.criteriaListDB = criteria;
    });
  }

  //Method to execute the selection process inmediatly.
  executeSelectionProcess(is_automatized:string): void{
    this.fillCriteriaConfigurationList(Number(is_automatized));
    this.updateCriteriaList(is_automatized);

    //Delete record with column AUTOMATIZED === is_automatized
    this.criteriaConfService.deleteConfsByAutomatized(is_automatized).pipe(
      concatMap(()=> forkJoin([
        //Services are executed at the same time when deleteConfsByAutomatized finish
        this.criteriaConfService.postAllCriteriaConfs(this.criteriaConf),
        this.criterionService.postAllCriteria(this.criteriaListDB)
      ])),
      concatMap(() => {
        if(is_automatized === '0'){
          //Service is executed when previous services finish
          return this.candidateService.postExecuteSelectionProcess();
        }else{
          let date = new Date(this.scheduleTime);
          let hour = date.getHours();
          let minutes = date.getMinutes();
          let dateFormated : string = hour+':'+minutes;
          console.log('Hora no formateada',this.scheduleTime);
          console.log('Hora formateada',dateFormated);
          return this.candidateService.postScheduleSelectionProcess(dateFormated);
        }
        
      })
    ).subscribe(() => {
      console.log("Criteria configuration successfuly deleted");
      console.log("Criteria configuration successfuly added");
      console.log("Criteria values successfuly added");
      if(is_automatized === '0'){
        console.log("Selection process executed");
      }else{
        console.log("Selection process scheduled");
      }
      
      this.router.navigate(['/selection_process']);

    });
    
      
      //console.log("Hora guradada en scheduleTime",this.scheduleTime);
      //if(this.scheduleTime != ''){
      //  this.criteriaConfService.deleteConfsByAutomatized(is_automatized).pipe(
      //    concatMap(()=> forkJoin([
      //      this.criteriaConfService.postAllCriteriaConfs(this.criteriaConf),
      //      this.criterionService.postAllCriteria(this.criteriaListDB)
      //    ])),
      //    concatMap(() => {
      //      console.log(this.scheduleTime);
      //      return this.candidateService.postScheduleSelectionProcess(this.scheduleTime);
      //    })
      //  ).subscribe(() => {
      //    console.log("Criteria configuration successfuly deleted");
      //    console.log("Criteria configuration successfuly added");
      //    console.log("Criteria values successfuly added");
      //    console.log("Selection process scheduled");
      //  });
      //}

  }

  //Method to change value or scheduled value of criteria if the criterion was selected.
  updateCriteriaList(is_automatized: string): void{

    for (let criterion of this.criteriaListDB){

      if(this.multiSelectedCriteriaOptions[criterion.id_criterion]){
        if(is_automatized === '0'){
          criterion.value = this.multiSelectedCriteriaOptions[criterion.id_criterion].join(',');
        }else if(is_automatized === '1'){
          criterion.scheduled_value = this.multiSelectedCriteriaOptions[criterion.id_criterion].join(',');
        }
      }else if(this.selectedQuantitativeOptions[criterion.id_criterion]){
        const optionSelected = this.selectedQuantitativeOptions[criterion.id_criterion].optionSelected;
        const value = this.selectedQuantitativeOptions[criterion.id_criterion].value;

        if(is_automatized === '0'){
          criterion.value = `${optionSelected} ${value}`;
        }else if(is_automatized === '1'){
          criterion.scheduled_value = `${optionSelected} ${value}`;
        }

      }else{
        if(is_automatized === '0'){
          criterion.value = 'Undefined';
        }else if(is_automatized === '1'){
          criterion.scheduled_value = 'Undefined';
        }
        
      }
    }
  }

  //Method to fill criteria configuration list
  fillCriteriaConfigurationList(is_automatized: number): void{

    this.criteriaConf = [];

    for(const key in this.priorization){
      
      const item = this.priorization[key];
      const keyParts = key.split(':');
      let valueConf = keyParts[0];
      const priorityConf = item.value;
      const percentageConf = this.percentagesEntered[item.id];
      let comparatorConf = undefined;
      if(this.selectedQuantitativeOptions[item.id]){
        comparatorConf = this.selectedQuantitativeOptions[item.id].optionSelected;
        valueConf = this.selectedQuantitativeOptions[item.id].value.toString();
      }
      

      const criteriaConf: CriteriaConfInterface = {
        value: valueConf,
        priority: priorityConf.toString(),
        percentage: percentageConf,
        comparator: comparatorConf,
        automatized: is_automatized,
        criterion: {
          id_criterion: item.id
        }
      };
      this.criteriaConf.push(criteriaConf);
    }

    for(const optionsSelected in this.multiSelectedCriteriaOptions){
      if(this.multiSelectedCriteriaOptions[optionsSelected].length === 1){
        const criteriaConf: CriteriaConfInterface = {
          value: undefined,
          priority: undefined,
          percentage: this.percentagesEntered[optionsSelected],
          comparator: undefined,
          automatized: is_automatized,
          criterion: {
            id_criterion: optionsSelected
          }
        };
        this.criteriaConf.push(criteriaConf);
      }
    }

  }

  onPreviousScreenButton(){
    
    if(Object.keys(this.priorization).length === 0){
      this.router.navigate(['/selection_process/criteria-percentages']);
    }else{
      this.router.navigate(['/selection_process/criteria-priorization']);
    }
  }


}
