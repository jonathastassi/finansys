import { CategoryService } from './../../categories/shared/category.service';
import { Category } from './../../categories/shared/category';
import { EntryService } from './../shared/entry.service';
import { Entry } from './../shared/entry';
import { Component, OnInit, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource/base.resource.form.component';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css'],
})
export class EntryFormComponent
  extends BaseResourceFormComponent<Entry>
  implements OnInit {
  categories: Array<Category>;

  imaskconfig = {
    mask: Number,
    scale: 2, // digits after point, 0 for integers
    thousandsSeparator: '', // any single char
    padFractionalZeros: true, // if true, then pads zeros at end to the length of scale
    normalizeZeros: true, // appends or removes zeros at ends
    radix: ',', // fractional delimiter
  };

  ptBr = {
    firstDayOfWeek: 0,
    dayNames: [
      'Domingo',
      'Segunda',
      'Terça',
      'Quarta',
      'Quinta',
      'Sexta',
      'Sábado',
    ],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    dayNamesMin: ['Do', 'Se', 'Te', 'Qa', 'Qi', 'Sx', 'Sa'],
    monthNames: [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ],
    monthNamesShort: [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez',
    ],
    today: 'Hoje',
    clear: 'Limpar',
    dateFormat: 'dd.mm.yy',
    weekHeader: 'Wk',
  };

  get types(): Array<any> {
    return Object.entries(Entry.types).map(([value, text]) => {
      return {
        text,
        value,
      };
    });
  }

  constructor(
    protected injector: Injector,
    protected entryService: EntryService,
    private categoryService: CategoryService
  ) {
    super(injector, new Entry(), entryService, Entry.fromJson);
  }

  protected creationPageTitle(): string {
    return 'Cadastro de Novo Lançamento';
  }
  protected editionPageTitle(): string {
    const name = this.resource.name || '';
    return 'Editando Lançamento: ' + name;
  }

  ngOnInit(): void {
    this.loadCategories();
    super.ngOnInit();
  }

  protected buildResourceForm(): void {
    this.resourceForm = this.fb.group({
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

  private loadCategories(): void {
    this.categoryService.getAll().subscribe((data) => (this.categories = data));
  }
}
