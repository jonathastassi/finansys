import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'reports',
    loadChildren: () =>
      import('./pages/reports/reports.module').then((m) => m.ReportsModule),
    data: {
      title: 'Relatório de Receitas e Despesas',
    },
  },
  {
    path: 'categories',
    loadChildren: () =>
      import('./pages/categories/categories.module').then(
        (m) => m.CategoriesModule
      ),
    data: {
      title: 'Categorias',
    },
  },
  {
    path: 'entries',
    loadChildren: () =>
      import('./pages/entries/entries.module').then((m) => m.EntriesModule),
    data: {
      title: 'Lançamentos',
    },
  },
  {
    path: '',
    redirectTo: '/reports',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
