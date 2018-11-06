import { Component, OnInit } from '@angular/core';
import { DialogService } from 'ng2-bootstrap-modal';
import { SearchComponent } from '../search/search.component';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ProjectManagerServiceService } from 'src/app/services/project-manager-service.service';
import { User } from 'src/app/models/user';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  operation : string;
  angularForm: FormGroup;
  error : any = { isError : false, errorMessage : ''};
  task : Task ={
    EndDate : null,
    IsTaskEnded : null,
    ParentTaskId : null,
    ParentTaskName : null,
    Priority : 0,
    ProjectId : null,
    ProjectName : null,
    StartDate : null,
    TaskId : null,
    TaskName : null,
    UserId : null,
    UserName : null
  };

  constructor(private service : ProjectManagerServiceService, private fb: FormBuilder, private dialogService:DialogService) { 
    this.createForm();
  }

  ngOnInit() {
  }

  compareTwoDates() {
    if(new Date(this.angularForm.controls['endDate'].value)<new Date(this.angularForm.controls['startDate'].value)){
        this.error={isError:true,errorMessage:'End Date should not greater than start date.'};
    }
    else {
      this.error={isError:false};
    }
  }

  createForm() {
    this.operation = "Add";
    this.angularForm = this.fb.group({
      projectName: new FormControl({value:'',disabled : true}, Validators.required),
      taskName : new FormControl({},Validators.required),
      priority : new FormControl(),
      parentTaskCheckbox : new FormControl(),
      parentTask : new FormControl({value:'',disabled : true}),
      startDate : new FormControl({value : new Date(), disabled : false}),
      endDate : new FormControl({value : new Date(),disabled : false}),
      userName : new FormControl({value:'',disabled : true}),
    });
  }

  parentTaskChecked(checked : boolean) {
    if(checked) {
      this.angularForm.controls['priority'].disable();
      this.angularForm.controls['startDate'].disable();
      this.angularForm.controls['endDate'].disable();
      this.task.ProjectName = '';
      this.task.Priority=0;
      this.task.StartDate =null;
      this.task.EndDate=null;
      this.task.UserName=null;
      this.task.UserId=null;
      this.task.ProjectId=null;
    }
    else {
      this.angularForm.controls['priority'].enable();
      this.angularForm.controls['startDate'].enable();
      this.angularForm.controls['endDate'].enable();
    }
  }



}
