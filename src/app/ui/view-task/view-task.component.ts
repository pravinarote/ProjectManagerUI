import { Component, OnInit } from '@angular/core';
import { ProjectManagerServiceService } from 'src/app/services/project-manager-service.service';
import { DialogService } from 'ng2-bootstrap-modal';
import { Task } from 'src/app/models/task';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
  taskList : Task[];

  constructor(private service : ProjectManagerServiceService, private dialogService:DialogService, private _router: Router) {

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

  editTask(id : Task) {
    // this._router.navigateByUrl('/EditTask/'+ JSON.stringify(id));
    if((id.StartDate == null || id.StartDate == undefined) && (id.EndDate == null || id.EndDate == undefined)) {
      this._router.navigate(['/EditTask/:id/:parent',{id : id.TaskId, parent : 1}]);
    }
    else {
      this._router.navigate(['/EditTask/:id/:parent',{id : id.TaskId, parent : 0}]);
    }
  }

  endTask(id : number) {
    this.service.endTask(id);

    this.service.serviceResponseReceived.subscribe((value) => {
      this.getTasks();
    });
  }

  private getTime(date?: Date) {
    return date != null && date!=undefined ? new Date(date).getTime() : 0;
  }

  onSortStartDate() {
    if(this.taskList!=undefined && this.taskList.length > 0) {
      this.taskList.sort((x1,x2)=> {
        return this.getTime(x1.StartDate) - this.getTime(x2.StartDate)
      });
    }
  }

  onSortEndDate() {
    if(this.taskList!=undefined && this.taskList.length > 0) {
      this.taskList.sort((x1,x2)=> {
        return this.getTime(x1.EndDate) - this.getTime(x2.EndDate)
      });
    }
  }

  onSortPriority() {
    if(this.taskList!=undefined && this.taskList.length > 0) {
      this.taskList.sort((x1,x2)=> {
        return x1.Priority - x2.Priority;
      });
    }
  }

  onSortTaskCompletion() {
    if(this.taskList!=undefined && this.taskList.length > 0) {
      this.taskList.sort((x1,x2)=> {
        return 1;
      });
  }
}

searchProject() {
  
}

}
