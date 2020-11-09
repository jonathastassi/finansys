import { CategoryService } from './../../categories/shared/category.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, flatMap, map } from 'rxjs/operators';
import { Entry } from './entry';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  private apiPath: string = "api/entries";

  constructor(
    private http: HttpClient,
    private categoryService: CategoryService
  ) { }

  getAll(): Observable<Entry[]> {
    return this.http.get<Entry[]>(this.apiPath).pipe(
      map(x => {
        return x.map(entry => Object.assign(new Entry(), entry));
      }),
      catchError(this.handleError),
    );
  }

  getById(id: number): Observable<Entry> {
    return this.http.get<Entry>(`${this.apiPath}/${id}`).pipe(
      map(x => Object.assign(new Entry(), x)),
    );
  }

  create(entry: Entry): Observable<Entry> {
    return this.categoryService.getById(entry.categoryId)
      .pipe(
        flatMap(value => {
          entry.category = value;
          return this.http.post<Entry>(this.apiPath, entry).pipe(
            catchError(this.handleError),
          );
        })
      );
  }

  update(entry: Entry): Observable<Entry> {
    const url = `${this.apiPath}/${entry.id}`;

    return this.categoryService.getById(entry.categoryId)
      .pipe(
        flatMap(
          value => {
            entry.category = value;
            return this.http.put(url, entry).pipe(
              catchError(this.handleError),
              map(() => entry)
            );
          }
        )
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
