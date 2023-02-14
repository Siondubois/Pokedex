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
        console.log(Object.entries(data));
        Object.entries(data).forEach(element => {
          if (element[1].email === this.loginForm.value.email && element[1].password === this.loginForm.value.password) {
            this.isLoggedIn = true;
            this.router.navigate(['/']);
          } else {
            this.notInDB = true;
          };
        })
      }
    )
  }

  get password() {
    return this.loginForm?.get('password') as FormControl;
  }

  get email() {
    return this.loginForm?.get('email') as FormControl;
  }
}
