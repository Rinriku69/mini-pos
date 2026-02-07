import { Component, effect, inject, Signal, signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { form, minLength ,FormField} from '@angular/forms/signals';
import { RegisterForm } from '../../models/types';


@Component({
  selector: 'app-register',
  imports: [formField],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private fb = inject(FormBuilder)
  protected registerModel: WritableSignal<RegisterForm> = signal({
    name: '',
    email: '',
    password: ''

  });

  readonly registerForm = form(this.registerModel);

  /* protected registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],

  }) */


  constructor() {
    /* effect(() => {

    }) */
  }
}
