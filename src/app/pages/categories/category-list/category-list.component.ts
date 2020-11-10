import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/pages/categories/shared/category';
import { CategoryService } from '../shared/category.service';
import { BaseResourceListComponent } from '../../../shared/components/base-resource/base.resource.list.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent
  extends BaseResourceListComponent<Category>
  implements OnInit {
  constructor(private categoryService: CategoryService) {
    super(categoryService);
  }
}
