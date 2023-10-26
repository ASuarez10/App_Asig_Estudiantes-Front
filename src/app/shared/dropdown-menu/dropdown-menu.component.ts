import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface CheckboxChangeEvent {
  name: string;
  isChecked: boolean;
}

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.css']
})
export class DropdownMenuComponent {

  //Category name for dropdown menu
  @Input() categoryName: string = '';

  //Dropdown menu options
  @Input() options: string[] = [];

  @Output() checkboxSelected = new EventEmitter<CheckboxChangeEvent>();

  isActive: boolean = false;

  //Selected option from dropdown menu checkboxes
  selectedOptions: { [key: string]: boolean } = {};

  ngOnInit() {
    this.options.forEach(option => this.selectedOptions[option] = false);
  }

  toggleDropdown() {
    this.isActive = !this.isActive;
  }

  

  onCheckboxChange(option: string, event: Event) {
    //const isChecked = this.selectedOptions[option];
    const isChecked = (event.target as HTMLInputElement).checked;
    this.selectedOptions[option] = isChecked;
    this.checkboxSelected.emit({ name: option, isChecked });
  }

}
