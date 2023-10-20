import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataLoadingRoutingModule } from './data-loading-routing.module';
import { CandidatesLoadingComponent } from './candidates-loading/candidates-loading.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrimeNgModule } from 'src/app/prime-ng/prime-ng.module';


@NgModule({
  declarations: [
    CandidatesLoadingComponent
  ],
  imports: [
    CommonModule,
    DataLoadingRoutingModule,
    SharedModule,
    PrimeNgModule
  ]
})
export class DataLoadingModule { }
