import { Component, computed, inject, signal } from '@angular/core';
import { LoginForm } from '../../models/types';
import { form, FormField, required } from '@angular/forms/signals';
import { LoginService } from '../../services/login-service';

@Component({
  selector: 'app-login',
  imports: [FormField],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly loginService = inject(LoginService)
  protected readonly formDisabled = computed(() => {
    if (this.loginForm().invalid()) {
      return true
    }
    return false
  })
  protected loginModel = signal<LoginForm>({
    name: '',
    password: ''
  })

  loginForm = form(this.loginModel, (path) => {
    required(path.name, { message: 'User name is required' })
    required(path.password, { message: 'Password is required' })
  })

  loginSubmit(): void {
    this.loginService.loginAutherize(this.loginForm);
  }
}
