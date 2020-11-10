import { EntryFormComponent } from './entry-form/entry-form.component';
import { EntryListComponent } from './entry-list/entry-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: EntryListComponent,
    data: {
      title: 'Lançamentos',
    },
  },
  {
    path: 'new',
    component: EntryFormComponent,
    data: {
      title: 'Cadastro de Novo Lançamento',
    },
  },
  {
    path: ':id/edit',
    component: EntryFormComponent,
    data: {
      title: 'Editando Lançamento',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntriesRoutingModule {}
