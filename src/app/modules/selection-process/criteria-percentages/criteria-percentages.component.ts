import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CriteriaDataService } from 'src/app/core/service/criteria-data.service';
import { CriterionInterface } from 'src/app/core/model/criterion';
import { CandidateService } from 'src/app/core/service/candidate.service';
import { CareerService } from 'src/app/core/service/career.service';
import { EducationTypeService } from 'src/app/core/service/education-type.service';
import { HeadquarterService } from 'src/app/core/service/headquarter.service';

@Component({
  selector: 'app-criteria-percentages',
  templateUrl: './criteria-percentages.component.html',
  styleUrls: ['./criteria-percentages.component.css']
})
export class CriteriaPercentagesComponent {

  //Variable that stores the rol from the browser local storage
  usuarioRol: string = '';

  //List of criteria
  criteriaList: CriterionInterface[] = [];

   //List of criteria selected with checkbox
   selectedCriteria: string[] = [];

   //List of comparators for cuantitative criteria
   cuantitativeComparatorsList: string[] = ['Mayor a', 'Menor a'];

  constructor(private criteriaDataService: CriteriaDataService, private candidateService: CandidateService, private careerService: CareerService,
              private educationTypeService: EducationTypeService, private headquarterService: HeadquarterService, private router: Router){

    //Get the data shared from CriteriaSelectionComponent
    this.criteriaList = this.criteriaDataService.getCriteriaList();
    this.selectedCriteria = this.criteriaDataService.getSelectedCriteia();
    console.log(this.criteriaList);
    console.log(this.selectedCriteria);

  }

  ngOnInit(): void{
    this.usuarioRol = localStorage.getItem('ROL') as string;
    this.fillCriteriaOptions();    
  }

  //List with the options for every qualitative criterion. Key is the criterion id.
  selectedOptions: { [key: string]: string[] } = {};

  //List with the options selected by user for every criterion.
  multiSelectedCriteriaOptions: { [key: string]: string[] } = {};

  //List with the options selected for every quantitative criterion.
  selectedQuantitativeOptions: { [key: string]: {optionSelected: string, value: number } } = {};

  //List with the percentage por each criterion
  percentagesEntered: { [key: string]: number } = {};

  //Method to go through each criterion and get the options to display in the multiselect.
  fillCriteriaOptions(){
    this.criteriaList.forEach(criterion => {
      if(criterion.id_criterion === '4' ||  criterion.id_criterion === '6'){
        this.selectedQuantitativeOptions[criterion.id_criterion] = {optionSelected: '', value: 0};
        this.percentagesEntered[criterion.id_criterion] = 0;
      }else if(criterion.id_criterion === '1'){
        this.candidateService.getAllCandidatesSexes().subscribe(data => {
          this.createDictionaries(data, criterion.id_criterion);
        });
      }else if(criterion.id_criterion === '2'){
        this.candidateService.getAllCandidatesCities().subscribe(data => {
          this.createDictionaries(data, criterion.id_criterion);
        });
      }else if(criterion.id_criterion === '3'){
        this.candidateService.getAllCandidatesEstates().subscribe(data => {
          this.createDictionaries(data, criterion.id_criterion);
        });
      }else if(criterion.id_criterion === '5'){
        this.educationTypeService.getAllEducationTypesNames().subscribe(data => {
          this.createDictionaries(data, criterion.id_criterion);
        });
      }else if(criterion.id_criterion === '7'){
        this.headquarterService.getAllHeadquartersNames().subscribe(data => {
          this.createDictionaries(data, criterion.id_criterion);
        });
      }else if(criterion.id_criterion === '8'){
        this.careerService.getAllCareersNames().subscribe(data => {
          this.createDictionaries(data, criterion.id_criterion);
        });
      }
    });
  }

  createDictionaries(data: string[], id: string){
    this.selectedOptions[id] = data;
    this.multiSelectedCriteriaOptions[id] = [];
    this.percentagesEntered[id] = 0;
  }

  showSelectedOptions(){
    console.log(this.multiSelectedCriteriaOptions);
    console.log(this.selectedQuantitativeOptions);
    console.log(this.percentagesEntered);
  }

  sumPercentages(): number{
    let percentageSum: number = 0;
    for(const percentage in this.percentagesEntered){
      percentageSum += this.percentagesEntered[percentage];
    }
    return percentageSum;
  }

  theresEmptyFields(): boolean{

    for(const optionsSelected in this.multiSelectedCriteriaOptions){
      if(this.multiSelectedCriteriaOptions[optionsSelected].length === 0){
        return true;
      }
    }

    for(const key in this.selectedQuantitativeOptions){
      const object = this.selectedQuantitativeOptions[key];

      if(object.optionSelected === '' || object.value === 0){
        return true;
      }
    }

    return false;
  }

  onNextButtonClick(){

    if(this.sumPercentages() === 100){
      if(this.theresEmptyFields() === false){
        this.criteriaDataService.addMultiSelectedCriteriaOptions(this.multiSelectedCriteriaOptions);
        this.criteriaDataService.addSelectedQuantitativeOptions(this.selectedQuantitativeOptions);
        this.criteriaDataService.addPercentagesEntered(this.percentagesEntered);
        this.saveDataLocalStorage();
        this.router.navigate(['/selection_process/criteria-priorization']);//Cambiar ruta a nuevo componente
      }else{
        console.log("There are at least 1 field empty");
      }
      
    }else{
      console.log("Percentage sum is not equal to 100");
      
    }

  }

  //Funcion temporal para tener datos en la otra pantalla de priorizacion
  saveDataLocalStorage(){
    const criteriaListJSON = JSON.stringify(this.criteriaList);
    localStorage.setItem('criteriaList', criteriaListJSON);

    const multiSelectedCriteriaOptionsJSON = JSON.stringify(this.multiSelectedCriteriaOptions);
    localStorage.setItem('multiSelectedCriteriaOptions', multiSelectedCriteriaOptionsJSON);

    const selectedQuantitativeOptionsJSON = JSON.stringify(this.selectedQuantitativeOptions);
    localStorage.setItem('selectedQuantitativeOptions', selectedQuantitativeOptionsJSON);

    const percentagesEnteredJSON = JSON.stringify(this.percentagesEntered);
    localStorage.setItem('percentagesEntered', percentagesEnteredJSON);
  }

}
