import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrimeNgModule } from 'src/app/prime-ng/prime-ng.module'; 
import { SelectionProcessRoutingModule } from './selection-process-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { FormsModule } from '@angular/forms';
import { CriteriaSelectionComponent } from './criteria-selection/criteria-selection.component';
import { CriterionService } from 'src/app/core/service/criterion.service';
import { CriteriaPercentagesComponent } from './criteria-percentages/criteria-percentages.component';
import { CriteriaDataService } from 'src/app/core/service/criteria-data.service';
import { CandidateService } from 'src/app/core/service/candidate.service';
import { CareerService } from 'src/app/core/service/career.service';
import { EducationTypeService } from 'src/app/core/service/education-type.service';
import { HeadquarterService } from 'src/app/core/service/headquarter.service';
import { CriteriaPriorizationComponent } from './criteria-priorization/criteria-priorization.component';
import { ExecutionComponent } from './execution/execution.component';


@NgModule({
  declarations: [
    CriteriaSelectionComponent,
    CriteriaPercentagesComponent,
    CriteriaPriorizationComponent,
    ExecutionComponent
  ],
  imports: [
    CommonModule,
    SelectionProcessRoutingModule,
    SharedModule,
    CoreModule,
    FormsModule,
    PrimeNgModule
  ],
  providers: [
    CriterionService,
    CriteriaDataService,
    CandidateService,
    CareerService,
    EducationTypeService,
    HeadquarterService
  ]
})
export class SelectionProcessModule { }
