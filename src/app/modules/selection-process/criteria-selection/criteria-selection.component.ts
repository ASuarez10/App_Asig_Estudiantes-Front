import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DropdownMenuComponent } from 'src/app/shared/dropdown-menu/dropdown-menu.component';
import { CriterionService } from 'src/app/core/service/criterion.service'; 
import { CriterionInterface } from 'src/app/core/model/criterion';
import { DropdownCriterion } from 'src/app/core/model/dropdown-criterion';
import { CheckboxChangeEvent } from 'src/app/shared/dropdown-menu/dropdown-menu.component';
import { CriteriaDataService } from 'src/app/core/service/criteria-data.service';

@Component({
  selector: 'app-criteria-selection',
  templateUrl: './criteria-selection.component.html',
  styleUrls: ['./criteria-selection.component.css']
})
export class CriteriaSelectionComponent {

  //Variable that stores the rol from the browser local storage
  usuarioRol: string = '';

  //List of criteria
  criteriaList: CriterionInterface[] = [];

  //Criteria ordered in category groups. Ex: {category: "Datos basicos", options: ["Sexo", "Ciudad de origen"]}
  categories: DropdownCriterion[] = [];

  //List of criteria selected with checkbox
  selectedCriteria: string[] = [];

  constructor(private criterionService : CriterionService, private router: Router, private criteriaDataService: CriteriaDataService){}

  ngOnInit(): void{
    this.usuarioRol = localStorage.getItem('ROL') as string;
    this.getCriteria();
  }

  //Method to get criteria data from the server and db
  getCriteria(): void {
    this.criterionService.getAllCriteria().subscribe(criteria => {
      this.criteriaList = criteria
      console.log(this.criteriaList);
      this.organizeCategories();
    });
  }

  //Method to organize criteria in categories in variable "categories"
  organizeCategories(){
    this.criteriaList.forEach(criterion => {
      if(criterion.mandatory === '0'){
        const existing_category = this.categories.find(item => item.category === criterion.category);

        if(existing_category){
          existing_category.options.push(criterion.name);
        }else{
          this.categories.push({category: criterion.category, options: [criterion.name]});
        }
      }else{
        this.selectedCriteria.push(criterion.name);
      }
    });
    console.log(this.categories);
  }

  //Method that captures the event selected from the checkbox and adds or removes criteria from list of selected.
  onCheckboxSelected(event: CheckboxChangeEvent) {
    console.log(event.name, event.isChecked);
    
    if (event.isChecked) {
      this.selectedCriteria.push(event.name);
    } else {
      const index = this.selectedCriteria.indexOf(event.name);
      if(index !== -1){
        this.selectedCriteria.splice(index, 1);
      }
    }
    console.log(this.selectedCriteria);
    
  }

  onNextButtonClick(){
    if(this.selectedCriteria.length === 5){
      const criteriaSelectedList = this.criteriaList.filter(criterion => this.selectedCriteria.includes(criterion.name));
      console.log(criteriaSelectedList);
      this.criteriaDataService.addSelectedCriteria(this.selectedCriteria);
      this.criteriaDataService.addCriteriaList(criteriaSelectedList);
      this.router.navigate(['/selection_process/criteria-percentages']);
    }else{
      console.log("Criteria selected amount is not valid: ", this.selectedCriteria);
      
    }
  }

}
