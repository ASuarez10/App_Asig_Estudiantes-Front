import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { SelectionProcessRoutingModule } from './selection-process-routing.module';
import { CriteriaSelectionComponent } from './criteria-selection/criteria-selection.component';


@NgModule({
  declarations: [
    CriteriaSelectionComponent
  ],
  imports: [
    CommonModule,
    SelectionProcessRoutingModule,
    SharedModule
  ]
})
export class SelectionProcessModule { }
