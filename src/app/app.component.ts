import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'APP_ASIG_ESTUDIANTES_ANGULAR';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const rol = localStorage.getItem('ROL');

    if (rol === 'admin') {
      this.router.navigate(['/data_loading']);
    }else if(rol === 'recruiter'){
      this.router.navigate(['/selection_process']);
    }
  }


  
}
