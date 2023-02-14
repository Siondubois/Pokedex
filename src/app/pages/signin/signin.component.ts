import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/typings';

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

  constructor(private authService: AuthService) {
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    })
  }

  onSubmit() {

    this.user.email=this.loginForm.value.email;
    this.user.password=this.loginForm.value.password;

    this.authService.signIn(this.user)
    .subscribe(
      (data)=>{
        console.log(data);
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
