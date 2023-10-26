import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { FormsModule } from '@angular/forms';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { DropdownMenuComponent } from './dropdown-menu/dropdown-menu.component';



@NgModule({
  declarations: [
    MenuBarComponent,
    DropdownMenuComponent
  ],
  exports: [
    MenuBarComponent,
    DropdownMenuComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    FormsModule
  ]
})
export class SharedModule { }
