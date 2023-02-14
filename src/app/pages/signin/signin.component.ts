import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  regExpassword: RegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{4,}$/

  constructor(private authService: AuthService) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.pattern(this.regExpassword)])
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
