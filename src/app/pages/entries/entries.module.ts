import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryComponent } from './shared/entry/entry.component';



@NgModule({
  declarations: [EntryComponent],
  imports: [
    CommonModule
  ]
})
export class EntriesModule { }
