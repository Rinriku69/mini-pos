import { inject, Injectable } from '@angular/core';
import { RegisterForm } from '../models/types';
import { FieldTree } from '@angular/forms/signals';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private registerUrl = 'http://127.0.0.1:8000/api/register'
  private http = inject(HttpClient);
  private router = inject(Router)

  createUser(registerForm: FieldTree<RegisterForm>) {
    this.http.post(this.registerUrl, registerForm().value()).subscribe({
      next: (response) => {
        console.log('Successfully Screated', response);
        this.router.navigate(['/main/store'])

      },
      error: (error: HttpErrorResponse) => {
        if (error.status == 422) {
          const validationErrors = error.error;
          alert(validationErrors.message)
        } else if (error.status == 500) {
          alert('Server run into a problem please try again later')
        } else {
          alert("An error occurred")
        }

      }
    })
  }

}
