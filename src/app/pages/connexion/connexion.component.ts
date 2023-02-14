import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    })
  }

  onSubmit() {
    this.checkIfUserInDB();
  }

  checkIfUserInDB() {

    this.notInDB = false;

    this.authService.getUsers()
    .subscribe(
      (data)=>{

        let userFound = this.authService.isUserInDB(data, this.loginForm.value.email, this.loginForm.value.password);

        if (userFound) {
          this.authService.login();
          this.router.navigate(['/']);
        } else {
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
