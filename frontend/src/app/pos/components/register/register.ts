import { Component, computed, inject, signal, WritableSignal } from '@angular/core';
import { debounce, email, form, FormField, required } from '@angular/forms/signals';
import { RegisterForm } from '../../models/types';
import { LoginService } from '../../services/login-service';
import { JsonPipe } from '@angular/common';


@Component({
  selector: 'app-register',
  imports: [FormField, JsonPipe],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private loginService = inject(LoginService)
  protected readonly formDisabled = computed(() => {
    if (this.registerForm().invalid()) {
      return true
    }
    return false
  })
  protected registerModel = signal<RegisterForm>({
    name: '',
    email: '',
    password: ''

  });

  protected readonly registerForm = form(this.registerModel, (path) => {
    debounce(path.email, 500)
    required(path.email, { message: 'Email is required' });
    email(path.email, { message: 'Please enter a valid email address' })
    required(path.password, { message: 'Password is required' });
    required(path.name, { message: 'User name is required' });

  });
  constructor() { }

  registerSubmit(): void {
    console.log("Submitted")
    this.loginService.createUser(this.registerForm)
  }
}
