import { CategoryService } from './../../categories/shared/category.service';
import { Category } from './../../categories/shared/category';
import { EntryService } from './../shared/entry.service';
import { Entry } from './../shared/entry';
import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import toastr from "toastr";


@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent implements OnInit, AfterContentChecked {

  currentAction: string;
  entryForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;
  entry: Entry = new Entry();
  categories: Array<Category>;

  imaskconfig = {
    mask: Number,
    scale: 2,  // digits after point, 0 for integers
    thousandsSeparator: '',  // any single char
    padFractionalZeros: true,  // if true, then pads zeros at end to the length of scale
    normalizeZeros: true,  // appends or removes zeros at ends
    radix: ',',  // fractional delimiter
  }

  ptBr = {
    firstDayOfWeek: 0,
    dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
    dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
    dayNamesMin: ["Do","Se","Te","Qa","Qi","Sx","Sa"],
    monthNames: [ "Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro" ],
    monthNamesShort: [ "Jan", "Fev", "Mar", "Abr", "Mai", "Jun","Jul", "Ago", "Set", "Out", "Nov", "Dez" ],
    today: 'Hoje',
    clear: 'Limpar',
    dateFormat: 'dd.mm.yy',
    // weekHeader: 'Wk'
  };

  get types(): Array<any> {
    return Object.entries(Entry.types).map(
      ([value, text]) => {
        return {
          text,
          value
        };
      }
    );
  }

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private entryService: EntryService,
    private categoryService: CategoryService
  ) {
  }

  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  private setPageTitle(): void {
    if (this.currentAction == "new") {
      this.pageTitle = "Cadastro de Novo Lançamento";
    } else {
      const entryName = this.entry.name || "";
      this.pageTitle = "Editando Lançamento: " + entryName;
    }
  }

  ngOnInit(): void {
    this.loadCategories();
    this.setCurrentAction();
    this.buildEntryForm();
    this.loadEntry();
  }

  loadEntry() {
    if (this.currentAction == "edit") {
      this.route.paramMap.pipe(
        switchMap(params => this.entryService.getById( parseInt(params.get("id"))))
      )
      .subscribe(
        (entry) => {
          this.entry = entry;
          console.log(this.entry);
          this.entryForm.patchValue(entry);
          console.log(this.entryForm.getRawValue());
        },
        (error) => alert("Ocorreu erro no servidor, tente mais tarde.")
      )
    }
  }
  buildEntryForm() {
    this.entryForm = this.fb.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null],
      type: ['expense', [Validators.required]],
      amount: [null, [Validators.required]],
      date: [null, [Validators.required]],
      paid: [true, [Validators.required]],
      categoryId: [null, [Validators.required]],
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
      this.createEntry();
    } else {
      this.updateEntry();
    }
  }
  updateEntry() {
    const entry: Entry = Object.assign(new Entry(), this.entryForm.value);

    this.entryService.update(entry)
      .subscribe(
        entry => this.actionsForSuccess(entry),
        error => this.actionsForError(error)
      )
  }

  createEntry() {
    const entry: Entry = Object.assign(new Entry(), this.entryForm.value);

    this.entryService.create(entry)
      .subscribe(
        entry => this.actionsForSuccess(entry),
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
  actionsForSuccess(entry: Entry): void {
    toastr.success("Solicitação processada com sucesso!");
    this.router.navigateByUrl("entries", {skipLocationChange: true})
      .then(() => this.router.navigate(["entries", this.entry.id, "edit"]));
  }

  private loadCategories(): void {
    this.categoryService.getAll()
      .subscribe(data => this.categories = data);
  }
}
