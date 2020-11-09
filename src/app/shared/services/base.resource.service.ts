import { HttpClient } from '@angular/common/http';
import { Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseResourceModel } from '../models/base.resource.model';

export abstract class BaseResourceService<T extends BaseResourceModel> {

  protected http: HttpClient;

  constructor(
    protected apiPath: string,
    protected injector: Injector,
    protected fromJsonFn: (jsonData: any) => T) {
    this.http = injector.get(HttpClient);
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.apiPath).pipe(
      map(this.jsonDataToResources.bind(this)),
      catchError(this.handleError),
    );
  }

  getById(id: number): Observable<T> {
    return this.http.get<T>(`${this.apiPath}/${id}`).pipe(
      map(this.jsonDataToResource.bind(this)),
      catchError(this.handleError),
    );
  }

  create(resource: T): Observable<T> {
    return this.http.post<T>(this.apiPath, resource).pipe(
      map(this.jsonDataToResource.bind(this)),
      catchError(this.handleError),
    );
  }

  update(resource: T): Observable<T> {
    const url = `${this.apiPath}/${resource.id}`;

    return this.http.put(url, resource).pipe(
      map(() => resource),
      catchError(this.handleError)
    );
  }

  delete(id: number): Observable<any> {
    const url = `${this.apiPath}/${id}`;

    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    );
  }

  protected handleError(handleError: any): Observable<any> {
    console.log('erro na requisição ', handleError);
    return throwError(handleError);
  }

  protected jsonDataToResources(jsonData: any[]): T[] {
    const resources: T[] = [];
    jsonData.forEach(entry => resources.push(this.fromJsonFn(entry)));
    return resources;
  }

  protected jsonDataToResource(jsonData: any): T {
    return this.fromJsonFn(jsonData);
  }
}
