import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { Category } from 'src/app/pages/categories/shared/category';
import { CategoryService } from 'src/app/pages/categories/shared/category.service';
import { BaseResourceFormComponent } from '../../../shared/components/base-resource/base.resource.form.component';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css'],
})
export class CategoryFormComponent extends BaseResourceFormComponent<Category> {
  constructor(
    protected injector: Injector,
    protected categoryService: CategoryService
  ) {
    super(injector, new Category(), categoryService, Category.fromJson);
  }

  protected buildResourceForm(): void {
    this.resourceForm = this.fb.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null],
    });
  }

  protected creationPageTitle(): string {
    return 'Cadastro de Nova Categoria';
  }
  protected editionPageTitle(): string {
    const name = this.resource.name || '';
    return 'Editando Categoria: ' + name;
  }
}
