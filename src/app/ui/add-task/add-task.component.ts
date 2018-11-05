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
  task : Task;

  constructor(private service : ProjectManagerServiceService, private fb: FormBuilder, private dialogService:DialogService) { 
    this.createForm();
    this.task = new Task();
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
      parentTask : new FormControl(),
      startDate : new FormControl({value : new Date(), disabled : true}),
      endDate : new FormControl({value : new Date(),disabled : true}),
      userName : new FormControl({value:'',disabled : true}),
    });
  }



}
