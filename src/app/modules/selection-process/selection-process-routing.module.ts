import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CriteriaSelectionComponent } from './criteria-selection/criteria-selection.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'criteria-selection', component: CriteriaSelectionComponent},
      {path: '**', redirectTo: 'criteria-selection'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SelectionProcessRoutingModule { }
