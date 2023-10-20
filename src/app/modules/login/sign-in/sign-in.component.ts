import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface User{
  password: string;
  role: string;
}

type UsersCredentials = Record<string,User>;

const usersCredentials: UsersCredentials = {
  '1007707024' : {password: 'alejandrosuarez', role: 'admin'},
  '16662181' : {password: 'andresfernandez', role: 'recruiter'}
};

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  constructor(private router: Router) { }
  
  user: string = "";
  password: string = ""
  incorrectCredentials: boolean = false;

  onSubmit(){

    if(this.user in usersCredentials){
      if(this.password == usersCredentials[this.user].password){
        console.log("Credenciales correctas");
        localStorage.setItem('ROL', usersCredentials[this.user].role);
        this.router.navigate(['/data_loading']);
      }else{
        this.incorrectCredentials = true;
        console.log("Credenciales incorrectas");
      }
    }else{
      this.incorrectCredentials = true;
      console.log("Credenciales incorrectas");
    }

  }

}
