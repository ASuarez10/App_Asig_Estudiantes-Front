import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface User{
  password: string;
  role: string;
}

type UsersCredentials = Record<string,User>;

//Test user credentials
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
  
  //Variable that store the logged-in user
  user: string = "";
  //Variable that store the logged-in password
  password: string = ""
  incorrectCredentials: boolean = false;

  //Function or event in "Entrar" button
  onSubmit(){

    //The logged-in user is in the "db"?
    if(this.user in usersCredentials){
      //The logged-in password is the correct?
      if(this.password == usersCredentials[this.user].password){
        console.log("Credenciales correctas");

        //Role is stored in browser local storage
        localStorage.setItem('ROL', usersCredentials[this.user].role);

        if(usersCredentials[this.user].role === 'admin'){
          this.router.navigate(['/data_loading']);
        }else if(usersCredentials[this.user].role === 'recruiter'){
          this.router.navigate(['/selection_process']);
        }
        
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
