import { EntryFormComponent } from './entry-form/entry-form.component';
import { EntriesRoutingModule } from './entries-routing.module';
import { EntryListComponent } from './entry-list/entry-list.component';
import { NgModule } from '@angular/core';
import { IMaskModule } from 'angular-imask';
import {CalendarModule} from 'primeng/calendar';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [EntryListComponent, EntryFormComponent],
  imports: [
    SharedModule,
    EntriesRoutingModule,
    IMaskModule,
    CalendarModule
  ]
})
export class EntriesModule { }
