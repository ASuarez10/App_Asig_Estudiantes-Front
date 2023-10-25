import { Component } from '@angular/core';

@Component({
  selector: 'app-criteria-selection',
  templateUrl: './criteria-selection.component.html',
  styleUrls: ['./criteria-selection.component.css']
})
export class CriteriaSelectionComponent {

  usuarioRol: string = '';

  ngOnInit(): void{
    this.usuarioRol = localStorage.getItem('ROL') as string;
  }

}
