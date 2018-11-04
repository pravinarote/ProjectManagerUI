import { Component, OnInit } from '@angular/core';
import { DialogService } from 'ng2-bootstrap-modal';
import { SearchProjectComponent } from '../search-project/search-project.component';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  constructor(private dialogService:DialogService) { }

  ngOnInit() {
  }



}
