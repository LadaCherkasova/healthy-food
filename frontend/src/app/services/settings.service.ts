import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class SettingsService {
  constructor(private http: HttpClient) {}

  getAvailableIngredients(): Observable<any> {
    return this.http.get('http://localhost:5000/settings/ingredients')
      .pipe(
        catchError(this.handleError)
      );
  }

  getDishesTypes(): Observable<any> {
    return this.http.get('http://localhost:5000/settings/types')
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError('Something bad happened; please try again.');
  }
}