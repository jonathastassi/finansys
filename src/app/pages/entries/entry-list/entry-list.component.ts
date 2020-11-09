import { EntryService } from './../shared/entry.service';
import { Component, OnInit } from '@angular/core';
import { Entry } from '../shared/entry';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit {

  entries: Entry[];

  constructor(
    private entryService: EntryService
  ) { }

  ngOnInit(): void {
    this.entryService.getAll()
      .subscribe(
        response => this.entries = response.sort((a,b) => b.id - a.id),
        error => alert("Erro ao carregar a lista")
      );
  }

  deleteEntry(id: number): void {
    const deleteConfirm = confirm("Deseja excluir o registro?");

    if (deleteConfirm) {
      this.entryService.delete(id)
        .subscribe(
          response => this.entries = this.entries.filter(x => x.id != id),
          error => console.log("Erro ao deletar")
        );
    }
  }

}
