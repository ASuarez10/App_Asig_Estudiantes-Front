import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidatesLoadingComponent } from './candidates-loading/candidates-loading.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'candidates', component: CandidatesLoadingComponent},
      {path: '**', redirectTo: 'candidates'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataLoadingRoutingModule { }
