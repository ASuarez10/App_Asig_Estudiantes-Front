import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MenubarModule} from 'primeng/menubar';
import { FileUploadModule } from 'primeng/fileupload';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    MenubarModule,
    FileUploadModule
  ]
})
export class PrimeNgModule { }
