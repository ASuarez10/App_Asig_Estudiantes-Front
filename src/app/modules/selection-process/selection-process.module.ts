import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { SelectionProcessRoutingModule } from './selection-process-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { FormsModule } from '@angular/forms';
import { CriteriaSelectionComponent } from './criteria-selection/criteria-selection.component';
import { CriterionService } from 'src/app/core/service/criterion.service';


@NgModule({
  declarations: [
    CriteriaSelectionComponent
  ],
  imports: [
    CommonModule,
    SelectionProcessRoutingModule,
    SharedModule,
    CoreModule,
    FormsModule
  ],
  providers: [
    CriterionService
  ]
})
export class SelectionProcessModule { }
