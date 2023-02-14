import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/typings';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent {
  loginForm: FormGroup;
  user: User = {
    email: '',
    password: '',
  };
  isLoggedIn = false;
  notInDB = false;

  constructor(private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    })
  }

  onSubmit() {
    this.checkIfUserInDB();
  }

  checkIfUserInDB() {
    this.authService.getUsers()
    .subscribe(
      (data)=>{

        let userFound = false;
        
        data.forEach(element => {
          if (element.email === this.loginForm.value.email && element.password === this.loginForm.value.password) {
            this.authService.login();
            this.router.navigate(['/']);
            userFound = true;
          }
        });

        if (!userFound) {
          this.notInDB = true;
        }

      });
  }

  get password() {
    return this.loginForm?.get('password') as FormControl;
  }

  get email() {
    return this.loginForm?.get('email') as FormControl;
  }
}
