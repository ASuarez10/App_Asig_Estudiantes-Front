import { Component, Input } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent {

  @Input() rol: string = '';

  items: MenuItem[] = [];

  items_recruiter: MenuItem[] = [];

  usuarioRol: string = ''

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
