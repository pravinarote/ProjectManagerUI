import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { Popup } from 'src/app/models/popup';

export interface ConfirmModel {
  title:string;
  message:string;
  items : Popup[]
}

@Component({
  selector: 'app-search-project',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent extends DialogComponent<ConfirmModel, Popup> implements ConfirmModel {
  title: string;
  message: string;
  active : string;

  items : Popup[];
  selectedRow : Popup;

  constructor(dialogService: DialogService) {
    super(dialogService);
  }

  selectRow(row : Popup) {
    this.selectedRow = row;
    this.active = 'active';
  }

  isSelected(todo:number): boolean {
    if(!this.selectedRow) {
      return false;
    }
    return this.selectedRow.Id ===  todo ? true : false;
  }

  setPopupModel(items : Popup[]) {
    this.items = items;
  }

  confirm() {
    this.result = this.selectedRow;
    this.close();
  }

  ngOnInit() {
  }

}
