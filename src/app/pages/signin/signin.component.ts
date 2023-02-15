import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { concatMap, map, of, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { User, UserWithFireBaseId } from 'src/app/typings';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  loginForm: FormGroup;
  user: User = {
    email: '',
    password: '',
  };
  regExpPassword: RegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{4,}$/;
  isAlreadyInDB: boolean = false;


  constructor(private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.pattern(this.regExpPassword)])
    })
  }

  onSubmit() {

    this.isAlreadyInDB = false;

    this.user.email = this.loginForm.value.email;
    this.user.password = this.loginForm.value.password;

    this.checkIfUserInDB()
    .pipe(
      concatMap(
        (userFound: boolean) => {
          if (userFound) {
            this.isAlreadyInDB = true;

            return of();
          } else {
            this.authService.login();
            this.router.navigate(['/']);

            return this.authService.signIn(this.user);
          }          
        }
      )
    )
    .subscribe();
  }

  checkIfUserInDB() {
    return this.authService.getUsers()
    .pipe(
      map(
        (data: UserWithFireBaseId[])=>{
          let userFound = this.authService.isUserInDB(data, this.loginForm.value.email, this.loginForm.value.password);

          return userFound;
        }
      )
    )
  }

  get password() {
    return this.loginForm?.get('password') as FormControl;
  }

  get email() {
    return this.loginForm?.get('email') as FormControl;
  }
}
