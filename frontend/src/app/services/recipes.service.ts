import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthStore } from './auth.store';

@Injectable({providedIn: 'root'})
export class RecipesService {
  constructor(private http: HttpClient, private authStore: AuthStore) {}

  getAvailableRecipes(): Observable<any> {
    return this.http.get('http://localhost:5000/recipes/')
      .pipe(
        catchError(this.handleError)
      );
  }

  getCertainRecipe(id: number): Observable<any> {
    return this.http.get('http://localhost:5000/recipes/' + id + '/')
      .pipe(
        catchError(this.handleError)
      );
  }

  createRecipe(recipe: any): Observable<any> {
    const header = new HttpHeaders().set('token', this.authStore.getValue().token);
    return this.http.post('http://localhost:5000/recipes/', recipe, {headers: header})
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
