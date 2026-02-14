import { Component, computed, inject, signal } from '@angular/core';
import { debounce, email, form, FormField, required, validate } from '@angular/forms/signals';
import { RegisterForm } from '../../models/types';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-register',
  imports: [FormField],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private loginService = inject(AuthService)
  protected readonly errorMessage = computed(() =>
    this.loginService.registerErrorMessage()
  )
  protected readonly formDisabled = computed(() => {
    if (this.registerForm().invalid() || this.registerForm.password_confirmation().invalid()) {
      return true
    }
    return false
  })
  protected registerModel = signal<RegisterForm>({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''

  });

  protected readonly registerForm = form(this.registerModel, (path) => {
    debounce(path.email, 500)
    required(path.email, { message: 'Email is required' });
    email(path.email, { message: 'Please enter a valid email address' })
    required(path.password, { message: 'Password is required' });
    required(path.name, { message: 'User name is required' });
    validate(path.password_confirmation, ({ value }) => {
      if (value() !== this.registerForm.password().value()) {
        return { kind: 'https', message: 'Confirm password not match' }
      }
      return null
    })
  });
  constructor() { }

  registerSubmit(): void {
    console.log("Submitted")
    this.loginService.createUser(this.registerForm)
  }
}
