import { Injectable, Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, flatMap, map } from 'rxjs/operators';
import { BaseResourceService } from 'src/app/shared/services/base.resource.service';
import { CategoryService } from './../../categories/shared/category.service';
import { Entry } from './entry';

@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry> {

  constructor(
    protected injector: Injector,
    private categoryService: CategoryService
  ) {
    super('api/entries', injector, Entry.fromJson);
  }

  create(entry: Entry): Observable<Entry> {
    return this.getCategoryAndSendEntry(entry, super.create);
  }

  update(entry: Entry): Observable<Entry> {
    return this.getCategoryAndSendEntry(entry, super.update);
  }

  private getCategoryAndSendEntry(entry: Entry, sendFn: (entry: Entry) => Observable<Entry>): Observable<Entry> {
    return this.categoryService.getById(entry.categoryId)
      .pipe(
        flatMap(
          value => {
            entry.category = value;
            return sendFn(entry);
          }
        )
      );
  }

}
