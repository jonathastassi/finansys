import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/pages/categories/shared/category';
import { CategoryService } from '../shared/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Category[];

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.categoryService.getAll()
      .subscribe(
        response => this.categories = response,
        error => alert("Erro ao carregar a lista")
      )
  }

  deleteCategory(id: number): void {
    const deleteConfirm = confirm("Deseja excluir o registro?");

    if (deleteConfirm) {
      this.categoryService.delete(id)
        .subscribe(
          response => this.categories = this.categories.filter(x => x.id != id),
          error => console.log("Erro ao deletar")
        );
    }
  }

}
