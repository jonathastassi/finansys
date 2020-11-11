import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Category } from 'src/app/pages/categories/shared/category';
import { CategoryService } from 'src/app/pages/categories/shared/category.service';
import { BaseResourceServiceSpec } from './../../../shared/services/base.resource.service.spec';

const listCategories: Array<Category> = [
  {
    id: 1,
    name: 'Categoria 1',
    description: 'Descricao'
  },
  {
    id: 2,
    name: 'Categoria 2',
    description: 'Descricao'
  },
  {
    id: 3,
    name: 'Categoria 3',
    description: 'Descricao'
  },
];

const baseServiceSpec = new BaseResourceServiceSpec<Category>();
baseServiceSpec.loadSpecs('Category', CategoryService, listCategories, listCategories[1], 2);

describe('O CategoryService', () => {
  let service: CategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CategoryService
      ],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CategoryService);
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

});

