import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Category } from 'src/app/pages/categories/shared/category';
import { Entry } from 'src/app/pages/entries/shared/entry';
import { BaseResourceServiceSpec } from 'src/app/shared/services/base.resource.service.spec';
import { EntryService } from './entry.service';

const listEntries: Array<Entry> = [
  new Entry(1, 'Entry 1', 'description', '10', 'expense', '2020-10-10', true, 1, new Category(1, 'Cate 1')),
  new Entry(2, 'Entry 2', 'description', '10', 'expense', '2020-10-10', true, 1, new Category(1, 'Cate 1')),
  new Entry(3, 'Entry 3', 'description', '10', 'expense', '2020-10-10', true, 1, new Category(1, 'Cate 1')),
  new Entry(4, 'Entry 4', 'description', '10', 'expense', '2020-10-10', true, 1, new Category(1, 'Cate 1')),
];

const baseServiceSpec = new BaseResourceServiceSpec<Entry>();
baseServiceSpec.loadSpecs('Entry', EntryService, listEntries, listEntries[2], 3);

describe('O EntryService', () => {
  let service: EntryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EntryService,
      ],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(EntryService);
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });
});
