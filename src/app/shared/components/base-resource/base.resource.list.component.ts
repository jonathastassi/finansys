import { BaseResourceService } from '../../services/base.resource.service';
import { Injectable, OnInit } from '@angular/core';
import { BaseResourceModel } from '../../models/base.resource.model';

@Injectable()
export abstract class BaseResourceListComponent<T extends BaseResourceModel>
  implements OnInit {
  resources: T[] = [];

  constructor(protected resourceService: BaseResourceService<T>) {}

  ngOnInit(): void {
    this.resourceService.getAll().subscribe(
      (response) => (this.resources = response.sort((a, b) => b.id - a.id)),
      (error) => alert('Erro ao carregar a lista')
    );
  }

  deleteResource(id: number): void {
    const deleteConfirm = confirm('Deseja excluir o registro?');

    if (deleteConfirm) {
      this.resourceService.delete(id).subscribe(
        (response) =>
          (this.resources = this.resources.filter((x) => x.id !== id)),
        (error) => console.log('Erro ao deletar')
      );
    }
  }
}
