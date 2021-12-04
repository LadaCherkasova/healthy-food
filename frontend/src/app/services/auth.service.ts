import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthStore } from './auth.store';

@Injectable({providedIn: 'root'})
export class AuthService {
  constructor(private http: HttpClient, private authStore: AuthStore) {}

  login(password: string, email: string): Observable<any> {
    return this.http.post('http://localhost:5000/auth/login/', {
      password: password,
      email: email
    })
      .pipe(
        catchError(this.handleError)
      );
  }

  register(name: string, password: string, email: string): Observable<any> {
    return this.http.post('http://localhost:5000/auth/register/', {
      name: name,
      password: password,
      email: email,
      isAdmin: false,
    })
      .pipe(
        catchError(this.handleError)
      );
  }

  getAllRecipes(): Observable<any> {
    return this.http.get('http://localhost:5000/recipes/')
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 403) {
      this.authStore.update({isLogged: false});
    } else if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError('Something bad happened; please try again.');
  }
}
