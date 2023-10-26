import { Component } from '@angular/core';
import { DropdownMenuComponent } from 'src/app/shared/dropdown-menu/dropdown-menu.component';
import { CriterionService } from 'src/app/core/service/criterion.service'; 
import { CriterionInterface } from 'src/app/core/model/criterion';
import { DropdownCriterion } from 'src/app/core/model/dropdown-criterion';
import { CheckboxChangeEvent } from 'src/app/shared/dropdown-menu/dropdown-menu.component';

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

  categories: DropdownCriterion[] = [];

  selectedCriteria: string[] = [];

  constructor(private criterionService : CriterionService){}

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

  organizeCategories(){

    this.criteriaList.forEach(criterion => {
      if(criterion.mandatory === '0'){
        const existing_category = this.categories.find(item => item.category === criterion.category);

        if(existing_category){
          existing_category.options.push(criterion.name);
        }else{
          this.categories.push({category: criterion.category, options: [criterion.name]});
        }
      }
    });
    console.log(this.categories);
  }

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

}
