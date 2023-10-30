import { Component } from '@angular/core';
import { CriterionInterface } from 'src/app/core/model/criterion';
import { CriteriaDataService } from 'src/app/core/service/criteria-data.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-criteria-priorization',
  templateUrl: './criteria-priorization.component.html',
  styleUrls: ['./criteria-priorization.component.css']
})
export class CriteriaPriorizationComponent {

  //Variable that stores the rol from the browser local storage
  usuarioRol: string = '';

  //List with the options selected by user for every criterion.
  multiSelectedCriteriaOptions: { [key: string]: string[] } = {};

  //List with the options selected for every quantitative criterion.
  selectedQuantitativeOptions: { [key: string]: {optionSelected: string[], value: number } } = {};

  //List with the percentage por each criterion
  percentagesEntered: { [key: string]: number } = {};

  //List of selected criteria
  criteriaList: CriterionInterface[] = [];

  //Temporal List of criteria stored in browser local storage
  //criteriaListTemp: any;

  //multiSelectedCriteriaOptions converted to list to work with in HTML ngFor
  selectedQualitativeOptionsList: {id:string, options: string[]}[] = [];

  //selectedQuantitativeOptions converted to list to work with in HTML ngFor
  selectedQuantitativeOptionsList: {id:string, optionSelected: string[], value: number }[] = [];

  //Dictionary with the information of the criteria priorization where the key is the name of the option for qualitative criteria and the name of the criterion if its
  //quantitative and the vale of the priority.
  priorization: { [key: string]: {id:string, value: number} } = {};

  constructor(private criteriaDataService: CriteriaDataService){
  }

  ngOnInit(): void{

    //Get all data we previusly saved into the local storage
    this.criteriaList = this.criteriaDataService.getCriteriaList();
    console.log("Criteria list", this.criteriaList);
    
    this.usuarioRol = localStorage.getItem('ROL') as string;

    this.multiSelectedCriteriaOptions = this.criteriaDataService.getMultiSelectedCriteriaOptions();

    console.log("multiSelectedCriteriaOptions",this.multiSelectedCriteriaOptions);
    
    this.selectedQuantitativeOptions = this.criteriaDataService.getSelectedQuantitativeOptions();

    console.log("selectedQuantitativeOptions",this.selectedQuantitativeOptions);

    this.percentagesEntered = this.criteriaDataService.getPercentagesEntered();

    console.log("percentagesEntered",this.percentagesEntered);

    this.convertSelectedCriteriaOptionsList();
    this.fillPriorizationDictionary();
    
  }

  //Method to convert multiSelectedCriteriaOptions to a list
  convertSelectedCriteriaOptionsList(){
    for(const optionsSelected in this.multiSelectedCriteriaOptions){
      if(this.multiSelectedCriteriaOptions[optionsSelected].length > 1){
        this.selectedQualitativeOptionsList.push({id: optionsSelected, options: this.multiSelectedCriteriaOptions[optionsSelected]});
      }
    }

    for(const optionsSelected in this.selectedQuantitativeOptions){
      this.selectedQuantitativeOptionsList.push({id: optionsSelected, optionSelected: this.selectedQuantitativeOptions[optionsSelected].optionSelected, value: this.selectedQuantitativeOptions[optionsSelected].value});
    }
  }
  //Method to initialize and fill the priorization dictionary
  fillPriorizationDictionary(){
    for(const qualitativeOption of this.selectedQualitativeOptionsList){
      const idOption = qualitativeOption.id;
      for(const option of qualitativeOption.options){
        this.priorization[option] = {id: idOption, value: 0};
      }
    }

    for(const quantitativeOption of this.selectedQuantitativeOptionsList){
      const idOption = quantitativeOption.id;
      const criterionName = this.getCriterionNameById(idOption);
      this.priorization[criterionName] = {id: idOption, value: 0};
    }
    console.log("priorization inicial", this.priorization);
  }

  //Method to get a criterion name by its ID
  getCriterionNameById(id: string):string{
    const criterion = this.criteriaList.find(c => c.id_criterion === id);
    return criterion ? criterion.name : 'Name';
  }

  //Method to refresh the priorization dictionary
  setPriorizationValue(key: string, priorizationValue: number){
    this.priorization[key].value = priorizationValue;
  }

  //Method for the "Siguiente" button
  onNextButtonClick(){
    console.log("priorization final", this.priorization);
    this.criteriaDataService.addPriorization(this.priorization);
  }

  //getDataFromLocalStorage(){
    //const criteriaListTempStored = localStorage.getItem('criteriaList')
    //if(criteriaListTempStored){
      //this.criteriaListTemp = JSON.parse(criteriaListTempStored);
    //}

    //console.log("criteriaListTemp",this.criteriaListTemp);

    //const multiSelectedCriteriaOptionsStored = localStorage.getItem('multiSelectedCriteriaOptions')
    //if(multiSelectedCriteriaOptionsStored){
    //  this.multiSelectedCriteriaOptions = JSON.parse(multiSelectedCriteriaOptionsStored);
    //}

     //const selectedQuantitativeOptionsStored = localStorage.getItem('selectedQuantitativeOptions')
    //if(selectedQuantitativeOptionsStored){
    //  this.selectedQuantitativeOptions = JSON.parse(selectedQuantitativeOptionsStored);
    //}

    
    //const percentagesEnteredStored = localStorage.getItem('percentagesEntered')
    //if(percentagesEnteredStored){
    //  this.percentagesEntered = JSON.parse(percentagesEnteredStored);
    //}
  //}

}
