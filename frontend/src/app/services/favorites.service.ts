import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthStore } from './auth.store';

@Injectable({providedIn: 'root'})
export class FavoritesService {
  constructor(private http: HttpClient, private authStore: AuthStore) {}

  toggleFavorite(recipeId: number): Observable<any> {
    const header = new HttpHeaders().set('token', this.authStore.getValue().token);
    const userId = this.authStore.getValue().userId;
    return this.http.post('http://localhost:5000/favorites/', {userId: userId, recipeId: recipeId}, {headers: header})
      .pipe(
        catchError(this.handleError)
      );
  }

  isFavorite(recipeId: number): Observable<any> {
    const header = new HttpHeaders().set('token', this.authStore.getValue().token);
    const userId = this.authStore.getValue().userId;
    const params = new HttpParams()
      .set('userId', userId)
      .set('recipeId', recipeId);
    return this.http.get('http://localhost:5000/favorites/is-favorite/',{headers: header, params: params})
      .pipe(
        catchError(this.handleError)
      );
  }

  getFavorites(): Observable<any> {
    const header = new HttpHeaders().set('token', this.authStore.getValue().token);
    const params = new HttpParams().set('userId', this.authStore.getValue().userId);
    return this.http.get('http://localhost:5000/favorites/', {headers: header, params: params})
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
