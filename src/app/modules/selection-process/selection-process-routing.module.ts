import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CriteriaSelectionComponent } from './criteria-selection/criteria-selection.component';
import { CriteriaPercentagesComponent } from './criteria-percentages/criteria-percentages.component';
import { CriteriaPriorizationComponent } from './criteria-priorization/criteria-priorization.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'criteria-selection', component: CriteriaSelectionComponent},
      {path: 'criteria-percentages', component: CriteriaPercentagesComponent},
      {path: 'criteria-priorization', component: CriteriaPriorizationComponent},
      {path: '**', redirectTo: 'criteria-selection'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SelectionProcessRoutingModule { }
