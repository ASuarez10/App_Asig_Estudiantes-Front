import { Injectable } from '@angular/core';
import { CriterionInterface } from '../model/criterion';
import { DropdownCriterion } from '../model/dropdown-criterion';

@Injectable({
  providedIn: 'root'
})
export class CriteriaDataService {

  criteriaList: CriterionInterface[] = [];

  selectedCriteria: string[] = [];

  //List with the options selected by user for every criterion.
  multiSelectedCriteriaOptions: { [key: string]: string[] } = {};

  //List with the options selected for every quantitative criterion.
  selectedQuantitativeOptions: { [key: string]: {optionSelected: string, value: number } } = {};

  //List with the percentage por each criterion
  percentagesEntered: { [key: string]: number } = {};

  //Dictionary with the information of the criteria priorization where the key is the name of the option for qualitative criteria and the name of the criterion if its
  //quantitative and the value of the priority.
  priorization: { [key: string]: {id:string, value: number} } = {};

  constructor() { }

  addCriteriaList(list:CriterionInterface[]){
    this.criteriaList = list;
  }

  getCriteriaList(): CriterionInterface[]{
    return this.criteriaList;
  }

  addSelectedCriteria(list:string[]){
    this.selectedCriteria = list;
  }

  getSelectedCriteia(): string[]{
    return this.selectedCriteria;
  }

  addMultiSelectedCriteriaOptions(dictionary: { [key: string]: string[] }){
    this.multiSelectedCriteriaOptions = dictionary;
  }

  getMultiSelectedCriteriaOptions(): {[key: string]: string[]}{
    return this.multiSelectedCriteriaOptions;
  }

  addSelectedQuantitativeOptions(dictionary: { [key: string]: {optionSelected: string, value: number } }) {
    this.selectedQuantitativeOptions = dictionary;
  }

  getSelectedQuantitativeOptions(): { [key: string]: {optionSelected: string, value: number } } {
    return this.selectedQuantitativeOptions;
  }

  addPercentagesEntered(dictionary: { [key: string]: number }) {
    this.percentagesEntered = dictionary;
  }

  getPercentagesEntered(): { [key: string]: number }{
    return this.percentagesEntered;
  }

  addPriorization(dictionary: { [key: string]: {id:string, value: number} }){
    this.priorization = dictionary;
  }

  getPriorization(): { [key: string]: {id:string, value: number} }{
    return this.priorization;
  }

}
