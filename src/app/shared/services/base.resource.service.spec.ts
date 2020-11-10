import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BaseResourceModel } from 'src/app/shared/models/base.resource.model';
import { BaseResourceService } from 'src/app/shared/services/base.resource.service';



export class BaseResourceServiceSpec<T extends BaseResourceModel> {

  loadSpecs(modelName: string, serviceType: any, list: Array<T>, oneById: T, findId: number): void {
    let service: BaseResourceService<T>;
    let httpMock: HttpTestingController;

    describe(` O BaseResourceService<${ modelName }> `, () => {

      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            serviceType,
          ],
          imports: [RouterTestingModule.withRoutes([]), HttpClientTestingModule]
        });
        service = TestBed.inject(serviceType);
        httpMock = TestBed.inject(HttpTestingController);
      });

      it('Deve listar todos os recursos', fakeAsync(() => {

        service.getAll()
          .subscribe(
            response => {
              expect(response.length).toBe(list.length);
            }
          );

        const request = httpMock.expectOne(req => {
            return req.method === 'GET';
        });

        request.flush(list);

        tick();
      }));

      it('Deve listar um recurso por id', fakeAsync(() => {

        service.getById(findId)
          .subscribe(
            response => {
              expect(response.id).toEqual(findId);
            }
          );

        const request = httpMock.expectOne(req => {
            return req.method === 'GET';
        });

        request.flush(oneById);

        tick();
      }));

      // Deve incluir um novo recurso

      // Deve alterar um recurso

      // Deve remover um recurso


    });
  }
}
