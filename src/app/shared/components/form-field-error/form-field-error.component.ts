import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-field-error',
  template: `
    <p class="text-danger">
      {{ errorMessage }}
    </p>
  `,
  styleUrls: ['./form-field-error.component.css'],
})
export class FormFieldErrorComponent implements OnInit {
  // tslint:disable-next-line: no-input-rename
  @Input('form-control-name') formControl: FormControl;

  constructor() {}

  ngOnInit(): void {}

  public get errorMessage(): string | null {
    if (this.formControl.invalid && this.formControl.touched) {
      return this.getErrorMessage();
    }

    return null;
  }

  private getErrorMessage(): string | null {
    if (this.formControl.errors.required) {
      return 'Campo obrigatório';
    }

    if (this.formControl.errors.email) {
      return 'E-mail inválido';
    }

    if (this.formControl.errors.minlength) {
      const requiredLength = this.formControl.errors.minlength.requiredLength;
      return `Deve ter no mínimo ${requiredLength} caracteres`;
    }

    if (this.formControl.errors.maxlength) {
      const requiredLength = this.formControl.errors.maxlength.requiredLength;
      return `Deve ter no máximo ${requiredLength} caracteres`;
    }
  }
}
