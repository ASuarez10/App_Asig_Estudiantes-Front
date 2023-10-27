import { Component } from '@angular/core';
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
              private educationTypeService: EducationTypeService, private headquarterService: HeadquarterService){

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
  selectedQuantitativeOptions: { [key: string]: {optionSelected: string[], value: number } } = {};

  //List with the percentage por each criterion
  percentagesEntered: { [key: string]: number } = {};

  //Method to go through each criterion and get the options to display in the multiselect.
  fillCriteriaOptions(){
    this.criteriaList.forEach(criterion => {
      if(criterion.id_criterion === '4' ||  criterion.id_criterion === '6'){
        this.selectedQuantitativeOptions[criterion.id_criterion] = {optionSelected: [], value: 0};
        this.percentagesEntered[criterion.id_criterion] = 0;
      }else if(criterion.id_criterion === '1'){
        this.candidateService.getAllCandidatesSexes().subscribe(data => {
          this.selectedOptions[criterion.id_criterion] = data;
          this.multiSelectedCriteriaOptions[criterion.id_criterion] = [];
          this.percentagesEntered[criterion.id_criterion] = 0;
        });
      }else if(criterion.id_criterion === '2'){
        this.candidateService.getAllCandidatesCities().subscribe(data => {
          this.selectedOptions[criterion.id_criterion] = data;
          this.multiSelectedCriteriaOptions[criterion.id_criterion] = [];
          this.percentagesEntered[criterion.id_criterion] = 0;
        });
      }else if(criterion.id_criterion === '3'){
        this.candidateService.getAllCandidatesEstates().subscribe(data => {
          this.selectedOptions[criterion.id_criterion] = data;
          this.multiSelectedCriteriaOptions[criterion.id_criterion] = [];
          this.percentagesEntered[criterion.id_criterion] = 0;
        });
      }else if(criterion.id_criterion === '5'){
        this.educationTypeService.getAllEducationTypesNames().subscribe(data => {
          this.selectedOptions[criterion.id_criterion] = data;
          this.multiSelectedCriteriaOptions[criterion.id_criterion] = [];
          this.percentagesEntered[criterion.id_criterion] = 0;
        });
      }else if(criterion.id_criterion === '7'){
        this.headquarterService.getAllHeadquartersNames().subscribe(data => {
          this.selectedOptions[criterion.id_criterion] = data;
          this.multiSelectedCriteriaOptions[criterion.id_criterion] = [];
          this.percentagesEntered[criterion.id_criterion] = 0;
        });
      }else if(criterion.id_criterion === '8'){
        this.careerService.getAllCareersNames().subscribe(data => {
          this.selectedOptions[criterion.id_criterion] = data;
          this.multiSelectedCriteriaOptions[criterion.id_criterion] = [];
          this.percentagesEntered[criterion.id_criterion] = 0;
        });
      }
    });
  }

  showSelectedOptions(){
    console.log(this.multiSelectedCriteriaOptions);
    console.log(this.selectedQuantitativeOptions);
    console.log(this.percentagesEntered);
  }

}
