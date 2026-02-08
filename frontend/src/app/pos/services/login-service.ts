import { inject, Injectable, signal } from '@angular/core';
import { LoginForm, LoginResponse, RegisterForm } from '../models/types';
import { FieldTree } from '@angular/forms/signals';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenStorage } from './token.storage';
import { tap } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private registerUrl = 'http://127.0.0.1:8000/api/auth/register'
  private logInUrl = 'http://127.0.0.1:8000/api/auth/login'
  private logOutUrl = 'http://127.0.0.1:8000/api/auth/logout'
  private http = inject(HttpClient);
  private router = inject(Router);
  private tokenStorage = inject(TokenStorage);
  registerErrorMessage = signal({
    name: '',
    email: '',
    other: ''
  });
  loginErrorMessage = signal('');

  createUser(registerForm: FieldTree<RegisterForm>): void {
    this.http.post(this.registerUrl, registerForm().value()).subscribe({
      next: (response) => {
        console.log('Successfully Screated', response);
        this.router.navigate(['/main/login'])

      },
      error: (error: HttpErrorResponse) => {
        this.registerErrorMessage.set({
          name: '',
          email: '',
          other: ''
        })
        if (error.status == 422) {
          const validationErrors = error.error.errors;
          if (validationErrors.name) {
            this.registerErrorMessage.update((old) => ({ ...old, name: validationErrors.name[0] }));
          } else if (validationErrors.email) {
            this.registerErrorMessage.update((old) => ({ ...old, email: validationErrors.email[0] }));
          } else {
            this.registerErrorMessage.update((old) => ({ ...old, other: error.error.message }));
          }
        } else if (error.status == 500) {
          alert('Server run into a problem please try again later')
        } else {
          alert("An error occurred")
        }

      }
    })
  }

  loginAutherize(loginForm: FieldTree<LoginForm>): void {
    this.http.post<LoginResponse>(this.logInUrl, loginForm().value()).subscribe({
      next: (response) => {
        this.tokenStorage.set(response.access_token)
        this.router.navigate(['/main/store'])
        console.log(response)
      },

      error: (err: HttpErrorResponse) => {
        console.log(err)
        this.loginErrorMessage.set(err.error.error)
      }
    })
  }

  logOut() {
    localStorage.removeItem('ng-token');
    return this.http.get(this.logOutUrl).pipe(
      tap(() => window.location.reload())
    )
  }

}
