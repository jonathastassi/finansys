import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';

const routes: Routes = [
  {
    path: '',
    component: CategoryListComponent,
    data: {
      title: 'Categorias',
    },
  },
  {
    path: 'new',
    component: CategoryFormComponent,
    data: {
      title: 'Cadastro de Nova Categoria',
    },
  },
  {
    path: ':id/edit',
    component: CategoryFormComponent,
    data: {
      title: 'Editando Categoria',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule {}
