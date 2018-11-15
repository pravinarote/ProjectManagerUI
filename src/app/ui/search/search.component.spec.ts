import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogService } from 'ng2-bootstrap-modal';
import { FormsModule,ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { SearchComponent } from './search.component';
import { SearchFilterPipe } from 'src/app/pipes/search-filter.pipe';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Popup } from 'src/app/models/popup';

describe('SearchProjectComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let model : Popup[]; 

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule,HttpClientModule,RouterTestingModule,ReactiveFormsModule ],
      declarations: [ SearchComponent,SearchFilterPipe ],
      providers: [
        { provide: DialogService, useClass: DialogService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    model = [{Id:1, Name:'Scotr'},{Id : 2,Name:'Scott1'},{Id:3,Name:'Scott3'}];
    // model.push(new Popup() { Id:1,Name:'Scott' });
    // model.push(new Popup() { Id:2,Name:'Scott1' });
    // model.push(new Popup() { Id:3,Name:'Scott2' });
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('populate dialog model', () => {
    component.setPopupModel(model);
    expect(component.items.length).toBe(3);
  });

  it('set selected item in dialog', () => {
    var item = model[0]
    component.selectRow(item);
    expect(component.selectedRow).toBe(item);
  });

  it('verify selected item', () => {
    component.setPopupModel(model);
    var item = component.items[1]
    component.selectRow(item);
    expect(component.selectedRow).toBe(item);
    expect(component.isSelected(1)).toBe(false);
    expect(component.isSelected(2)).toBe(true);
  });


});
