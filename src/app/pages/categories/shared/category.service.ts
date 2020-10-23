import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Category } from './category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiPath: string = "api/categories";

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiPath).pipe(
      catchError(this.handleError),
    );
  }

  getById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiPath}/${id}`)

  }

  create(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiPath, category).pipe(
      catchError(this.handleError),
    );
  }

  update(category: Category): Observable<Category> {
    const url = `${this.apiPath}/${category.id}`;

    return this.http.put(url, category).pipe(
      catchError(this.handleError),
      map(() => category)
    );
  }

  delete(id: number): Observable<any> {
    const url = `${this.apiPath}/${id}`;

    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    );
  }

  handleError(handleError: any): Observable<any> {
    console.log("erro na requisição ", handleError);
    return throwError(handleError);
  }

}
