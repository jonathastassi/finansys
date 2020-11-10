import { EntryService } from './../shared/entry.service';
import { Component, OnInit } from '@angular/core';
import { Entry } from '../shared/entry';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource/base.resource.list.component';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css'],
})
export class EntryListComponent extends BaseResourceListComponent<Entry> {
  constructor(private entryService: EntryService) {
    super(entryService);
  }
}
