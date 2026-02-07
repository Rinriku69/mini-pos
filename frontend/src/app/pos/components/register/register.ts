import { Component, signal, WritableSignal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { RegisterForm } from '../../models/types';


@Component({
  selector: 'app-register',
  imports: [FormField,],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {

  protected registerModel: WritableSignal<RegisterForm> = signal({
    name: '',
    email: '',
    password: ''

  });

  readonly registerForm = form(this.registerModel);




  constructor() {
 
  }
}
