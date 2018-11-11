import { Component, OnInit } from '@angular/core';
import { ProjectManagerServiceService } from 'src/app/services/project-manager-service.service';
import { DialogService } from 'ng2-bootstrap-modal';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
  taskList : Task[];

  constructor(private service : ProjectManagerServiceService, private dialogService:DialogService) {

   }

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.taskList = [];
    this.service.getTasks().subscribe((data: Task[])=>{
      console.log(data);
      this.taskList = data;
    });
  }

}
