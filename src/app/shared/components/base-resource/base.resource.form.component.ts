import {
  AfterContentChecked,



  Injectable, Injector, OnInit
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import toastr from 'toastr';
import { BaseResourceModel } from '../../models/base.resource.model';
import { BaseResourceService } from '../../services/base.resource.service';

@Injectable()
export abstract class BaseResourceFormComponent<T extends BaseResourceModel>
  implements OnInit, AfterContentChecked {
  currentAction: string;
  resourceForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm = false;

  protected fb: FormBuilder;
  protected route: ActivatedRoute;
  protected router: Router;

  constructor(
    protected injector: Injector,
    protected resource: T,
    protected resourceService: BaseResourceService<T>,
    protected fromJsonFn: (jsonData: any) => T
  ) {
    this.fb = injector.get(FormBuilder);
    this.route = injector.get(ActivatedRoute);
    this.router = injector.get(Router);
  }

  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  protected setPageTitle(): void {
    if (this.currentAction === 'new') {
      this.pageTitle = this.creationPageTitle();
    } else {
      this.pageTitle = this.editionPageTitle();
    }
  }

  protected creationPageTitle(): string {
    return 'Novo';
  }
  protected editionPageTitle(): string {
    return 'Editar';
  }

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildResourceForm();
    this.loadResource();
  }

  protected loadResource(): void {
    if (this.currentAction === 'edit') {
      this.route.paramMap
        .pipe(
          switchMap((params) =>
            this.resourceService.getById(parseInt(params.get('id'), 10))
          )
        )
        .subscribe(
          (resource: T) => {
            this.resource = resource;
            this.resourceForm.patchValue(resource);
          },
          (error) => alert('Ocorreu erro no servidor, tente mais tarde.')
        );
    }
  }
  protected setCurrentAction(): void {
    if (this.route.snapshot.url[0]?.path === 'new') {
      this.currentAction = 'new';
    } else {
      this.currentAction = 'edit';
    }
  }
  public submitForm(): void {
    this.submittingForm = true;

    if (this.currentAction === 'new') {
      this.createResource();
    } else {
      this.updateResource();
    }
  }
  protected updateResource(): void {
    const resource: T = this.fromJsonFn(this.resourceForm.value);

    this.resourceService.update(resource).subscribe(
      (data) => this.actionsForSuccess(data),
      (error) => this.actionsForError(error)
    );
  }
  protected createResource(): void {
    const resource: T = this.fromJsonFn(this.resourceForm.value);

    this.resourceService.create(resource).subscribe(
      (data) => this.actionsForSuccess(data),
      (error) => this.actionsForError(error)
    );
  }

  protected actionsForError(error: any): void {
    toastr.error('Erro ao processar sua solicitação!');

    this.submittingForm = false;

    if (error.status === 422) {
      this.serverErrorMessages = JSON.parse(error._body).errors;
    } else {
      this.serverErrorMessages = [
        'Falha na comunicação com o servidor. Tente mais tarde',
      ];
    }
  }
  protected actionsForSuccess(resource: T): void {
    toastr.success('Solicitação processada com sucesso!');

    const baseComponentPath: string = this.route.snapshot.parent.url[0].path;

    this.router
      .navigateByUrl(baseComponentPath, { skipLocationChange: true })
      .then(() =>
        this.router.navigate([baseComponentPath, this.resource.id, 'edit'])
      );
  }

  protected abstract buildResourceForm(): void;
}
