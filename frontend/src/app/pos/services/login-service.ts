import { inject, Injectable } from '@angular/core';
import { RegisterForm } from '../models/types';
import { FieldTree } from '@angular/forms/signals';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private registerUrl = 'http://127.0.0.1:8000/api/register'
  private http = inject(HttpClient);

  createUser(registerForm: FieldTree<RegisterForm>) {
    this.http.post(this.registerUrl, registerForm().value()).subscribe({
      next: (response) => {
        console.log('Successfully Screated', response);

      },
      error: (error) => {
        console.error('An error occured:', error);

      }
    })
  }

}
