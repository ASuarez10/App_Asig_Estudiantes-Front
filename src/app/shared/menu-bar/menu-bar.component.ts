import { Component, Input } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent {

  //Menu bar styles
  menuBarStyles: { [style: string]: string } = {
    'background-color': '#E51A0D'
  };

  //Logout button styles
  buttonStyles: { [style: string]: string } = {
    'background-color': 'transparent',
    'border': 'none'
  };

  //Rol recieved for costumization
  @Input() rol: string = '';

  //Items or options in the menu bar. Example: "Inicio", "Mis reportes", etc.
  items: MenuItem[] = [];

  ngOnInit() {

    if(this.rol === 'recruiter'){
      this.items.push({
        label: 'Inicio'
      },
      {
        label: 'Mis reportes'
      })
    }
    
  }

}
