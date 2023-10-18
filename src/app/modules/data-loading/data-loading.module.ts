import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataLoadingRoutingModule } from './data-loading-routing.module';
import { CandidatesLoadingComponent } from './candidates-loading/candidates-loading.component';


@NgModule({
  declarations: [
    CandidatesLoadingComponent
  ],
  imports: [
    CommonModule,
    DataLoadingRoutingModule
  ]
})
export class DataLoadingModule { }
