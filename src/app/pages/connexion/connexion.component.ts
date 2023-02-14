import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent {
  loginForm: FormGroup;

  constructor() {
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    })
  }

  onSubmit() {
    console.log('yuou');
    console.log(this.loginForm);
  }

  get password() {
    return this.loginForm?.get('password') as FormControl;
  }

  get email() {
    return this.loginForm?.get('email') as FormControl;
  }
}
