import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MenubarModule} from 'primeng/menubar';
import { FileUploadModule } from 'primeng/fileupload';
import {MultiSelectModule} from 'primeng/multiselect';
import {DropdownModule} from 'primeng/dropdown';
import {CalendarModule} from 'primeng/calendar';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    MenubarModule,
    FileUploadModule,
    MultiSelectModule,
    DropdownModule,
    CalendarModule
  ]
})
export class PrimeNgModule { }
