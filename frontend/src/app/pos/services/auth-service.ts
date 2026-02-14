import { inject, Injectable, signal } from '@angular/core';
import { LoginForm, LoginResponse, RegisterForm, User } from '../models/types';
import { FieldTree } from '@angular/forms/signals';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenStorage } from './token.storage';
import { tap } from 'rxjs';
import { UserStorage } from './user.storage';
import { jwtDecode } from 'jwt-decode';



@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private registerUrl = 'http://127.0.0.1:8000/api/auth/register'
  private logInUrl = 'http://127.0.0.1:8000/api/auth/login'
  private logOutUrl = 'http://127.0.0.1:8000/api/auth/logout'
  private http = inject(HttpClient);
  private router = inject(Router);
  private tokenStorage = inject(TokenStorage);
  private userStorage = inject(UserStorage);
  private readonly userSignal = signal<User | null>(null);
  reactState = signal(localStorage.getItem('ng-token') ? '1' : '')
  registerErrorMessage = signal({
    name: '',
    email: '',
    other: ''
  });
  loginErrorMessage = signal('');
  constructor() {
    this.loadUserFromStorage();
  }

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

  loginAuthorize(loginForm: FieldTree<LoginForm>): void {
    this.http.post<LoginResponse>(this.logInUrl, loginForm().value()).subscribe({
      next: (response) => {
        this.tokenStorage.set(response.access_token)
        this.router.navigate(['/main/store'])
        this.reactState.set('1')

      },

      error: (err: HttpErrorResponse) => {
        console.log(err)
        this.loginErrorMessage.set(err.error.error)
      }
    })
  }

  logOut() {

    this.http.post<{ message: string }>(this.logOutUrl, {}).subscribe({
      next: (response) => {
        localStorage.removeItem('ng-token');
        this.reactState.set('')
        alert(response.message)
      },
      error: (err) => {
        console.log('An error occurred')
      }
    })
  }

  private loadUserFromStorage() {
    const token = localStorage.getItem('ng-token');
    if (token) {
      const decoded: any = jwtDecode(token);
      this.userSignal.set({ id: decoded.id, name: decoded.name, email: decoded.email, role: decoded.role });
    }
  }

  getRole() {

    return this.userSignal()?.role;

  }

}
