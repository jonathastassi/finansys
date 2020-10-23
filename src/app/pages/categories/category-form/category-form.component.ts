import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Category } from 'src/app/pages/categories/shared/category';
import { CategoryService } from 'src/app/pages/categories/shared/category.service';
import toastr from "toastr";


@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit, AfterContentChecked {

  currentAction: string;
  categoryForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;
  category: Category = new Category();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService
  ) {
  }

  ngAfterContentChecked(): void {
    this.setPageTitle()
  }

  private setPageTitle() {
    if (this.currentAction == "new") {
      this.pageTitle = "Cadastro de Nova Categoria";
    } else {
      const categoryName = this.category.name || "";
      this.pageTitle = "Editando Categoria: " + categoryName;
    }
  }

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildCayegoryForm();
    this.loadCategory();
  }

  loadCategory() {
    if (this.currentAction == "edit") {
      this.route.paramMap.pipe(
        switchMap(params => this.categoryService.getById( parseInt(params.get("id"))))
      )
      .subscribe(
        (category) => {
          this.category = category;
          this.categoryForm.patchValue(category);
        },
        (error) => alert("Ocorreu erro no servidor, tente mais tarde.")
      )
    }
  }
  buildCayegoryForm() {
    this.categoryForm = this.fb.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null]
    });
  }
  setCurrentAction() {
    if (this.route.snapshot.url[0].path == "new") {
      this.currentAction = "new";
    }
    else {
      this.currentAction = "edit";
    }
  }

  submitForm() {
    this.submittingForm = true;

    if (this.currentAction == "new") {
      this.createCategory();
    } else {
      this.updateCategory();
    }
  }
  updateCategory() {
    const category: Category = Object.assign(new Category(), this.categoryForm.value);

    this.categoryService.update(category)
      .subscribe(
        category => this.actionsForSuccess(category),
        error => this.actionsForError(error)
      )
  }

  createCategory() {
    const category: Category = Object.assign(new Category(), this.categoryForm.value);

    this.categoryService.create(category)
      .subscribe(
        category => this.actionsForSuccess(category),
        error => this.actionsForError(error)
      )
  }

  actionsForError(error: any): void {
    toastr.error("Erro ao processar sua solicitação!");

    this.submittingForm = false;

    if(error.status == 422) {
      this.serverErrorMessages = JSON.parse(error._body).errors;
    } else {
      this.serverErrorMessages = ["Falha na comunicação com o servidor. Tente mais tarde"];
    }
  }
  actionsForSuccess(category: Category): void {
    toastr.success("Solicitação processada com sucesso!");
    this.router.navigateByUrl("categories", {skipLocationChange: true})
      .then(() => this.router.navigate(["categories", this.category.id, "edit"]));
  }
}
