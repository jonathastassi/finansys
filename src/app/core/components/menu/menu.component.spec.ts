import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CategoryListComponent } from './../../../pages/categories/category-list/category-list.component';
import { EntryListComponent } from './../../../pages/entries/entry-list/entry-list.component';
import { ReportsComponent } from './../../../pages/reports/reports/reports.component';
import { MenuComponent } from './menu.component';


describe('O MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let router: Router;

  const routes = [
    {path: 'entries', component: EntryListComponent},
    {path: 'categories', component: CategoryListComponent},
    {path: 'reports', component: ReportsComponent},
  ] as Routes;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuComponent ],
      imports: [RouterTestingModule.withRoutes(routes)]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    router = TestBed.inject(Router);
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deve redirecionar para a rota /reports quando o menu Relatórios for clicado', fakeAsync(() => {

    const link = fixture.debugElement.nativeElement.querySelector('#navbarNav > ul > li:nth-child(1) > a');
    link.click();

    tick();

    expect(router.url).toBe('/reports');
  }));

  it('deve redirecionar para a rota /entries quando o menu Lançamentos for clicado', fakeAsync(() => {

    const link = fixture.debugElement.nativeElement.querySelector('#navbarNav > ul > li:nth-child(2) > a');
    link.click();

    tick();

    expect(router.url).toBe('/entries');
  }));

  it('deve redirecionar para a rota /categories quando o menu Categorias for clicado', fakeAsync(() => {

    const link = fixture.debugElement.nativeElement.querySelector('#navbarNav > ul > li:nth-child(3) > a');
    link.click();

    tick();

    expect(router.url).toBe('/categories');
  }));
});
