import { EntryService } from './../shared/entry.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EntryListComponent } from './entry-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('EntryListComponent', () => {
  let component: EntryListComponent;
  let fixture: ComponentFixture<EntryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryListComponent ],
      imports: [HttpClientTestingModule],
      providers: [EntryService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
