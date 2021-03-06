import { Component, OnInit } from '@angular/core';
import { DialogService } from 'ng2-bootstrap-modal';
import { SearchComponent } from '../search/search.component';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ProjectManagerServiceService } from 'src/app/services/project-manager-service.service';
import { User } from 'src/app/models/user';
import { Task } from 'src/app/models/task';
import { Popup } from 'src/app/models/popup';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  
  operation : string;
  angularForm: FormGroup;
  title : string;
  error : any = { isError : false, errorMessage : ''};
  projectNameError : any = { isError : false, errorMessage : ''};
  priorityError : any = { isError : false, errorMessage : ''};
  userError : any = { isError : false, errorMessage : ''};
  popupModel :  Popup[];
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
    UserName : null,
    IsParentTask : false,
    TaskStatusId : null
  };
  
  taskList : Task[];

  constructor(private route: ActivatedRoute, private service : ProjectManagerServiceService, private fb: FormBuilder, private _router: Router, private dialogService:DialogService) { 
    this.createForm();
    var startdate = new Date();
      var endDate = new Date(startdate.getFullYear(),startdate.getMonth(),startdate.getDate() + 1);
      this.task.StartDate =startdate;
      this.task.EndDate = endDate;
  }

  ngOnInit() {
    this.title = "Add Task";
    var taskId = this.route.snapshot.params['id'];
    var isParentTask =this.route.snapshot.params['parent'] as number;
    console.log('PARENT  : ' +isParentTask);
    
    if(taskId != undefined && isParentTask!=undefined) {

       this.title = "Update Task";
      //Get task from service
      if(isParentTask ==1) {
        this.service.getParentTaskById(taskId).subscribe((data: Task)=>{
          this.task = data;
          this.angularForm.controls['parentTaskCheckbox'].setValue(true);
          this.angularForm.controls['parentTaskCheckbox'].disable();
          this.parentTaskChecked(true,true);
        });
      }
      else {
        this.service.getTaskById(taskId).subscribe((data: Task)=>{
          this.task = data;
          this.angularForm.controls['parentTaskCheckbox'].setValue(false);
          this.parentTaskChecked(false,true);
          this.angularForm.controls['parentTaskCheckbox'].disable();
        });
      }
    }
    else{
      this.parentTaskChecked(false);
    }
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

  parentTaskChecked(checked : boolean,updateOperation : boolean = false) {
    if(checked) {
      this.angularForm.controls['priority'].disable();
      this.angularForm.controls['startDate'].disable();
      this.angularForm.controls['endDate'].disable();
      this.angularForm.controls['startDate'].setValidators(null);
      this.angularForm.controls['endDate'].setValidators(null);
      this.task.ProjectName = '';
      this.task.Priority=0;
      this.task.StartDate =null;
      this.task.EndDate=null;
      this.task.UserName=null;
      this.task.UserId=null;
      this.task.ProjectId=null;
      this.task.IsParentTask = true;
    }
    else {
      if(updateOperation == false)
      {
        var startdate = new Date();
        var endDate = new Date(startdate.getFullYear(),startdate.getMonth(),startdate.getDate() + 1);
        this.task.StartDate =startdate;
        this.task.EndDate = endDate;
      }
      this.task.IsParentTask = false;
      this.angularForm.controls['priority'].enable();
      this.angularForm.controls['startDate'].enable();
      this.angularForm.controls['endDate'].enable();
      this.angularForm.controls['startDate'].setValidators(Validators.required);
      this.angularForm.controls['endDate'].setValidators(Validators.required);
    }
  }

  showProjects() {
    var projects = this.service.getProjects();
    this.popupModel = [];
    projects.toPromise().then(project=>
      {
        project.forEach(x=> {
          var model = new Popup();
          model.Id = x.ProjectId;
          model.Name = x.ProjectName;
          if(x.IsSuspended == false)
            this.popupModel.push(model);
        });

        let disposable = this.dialogService.addDialog(SearchComponent, {
          title:'Search Project', 
          items : this.popupModel,
          message:'Confirm message'})
          .subscribe((row)=>{
              //We get dialog result
              if(row!=undefined) {
                  this.task.ProjectId = row.Id;
                  this.task.ProjectName = row.Name;
                  this.angularForm.controls['projectName'].markAsTouched();
              }
          });
        //We can close dialog calling disposable.unsubscribe();
        //If dialog was not closed manually close it by timeout
        setTimeout(()=>{
          disposable.unsubscribe();
        },100000);
      });
  }

  showParentTasks() {
    var parentTasks = this.service.getParentTasks();
    this.popupModel = [];
    parentTasks.toPromise().then(parentTask=>
      {
        parentTask.forEach(x=> {
          var model = new Popup();
          model.Id = x.TaskId;
          model.Name = x.TaskName;
          this.popupModel.push(model);
        });

        let disposable = this.dialogService.addDialog(SearchComponent, {
          title:'Search Parent Task', 
          items : this.popupModel,
          message:'Confirm message'})
          .subscribe((row)=>{
              //We get dialog result
              if(row!=undefined) {
                  this.task.ParentTaskId = row.Id;
                  this.task.ParentTaskName = row.Name;
              }
          });
        //We can close dialog calling disposable.unsubscribe();
        //If dialog was not closed manually close it by timeout
        setTimeout(()=>{
          disposable.unsubscribe();
        },100000);
      });
  }

  showUsers() {
    var users = this.service.getUsers();
    this.popupModel = [];
    users.toPromise().then(users=>
      {
        users.forEach(x=> {
          var model = new Popup();
          model.Id = x.UserId;
          model.Name = x.FirstName + ' ' + x.LastName;
          this.popupModel.push(model);
        });

        let disposable = this.dialogService.addDialog(SearchComponent, {
          title:'Search User', 
          items : this.popupModel,
          message:'Confirm message'})
          .subscribe((row)=>{
              //We get dialog result
              if(row!=undefined) {
                  this.task.UserId = row.Id;
                  this.task.UserName = row.Name;
              }
          });
        //We can close dialog calling disposable.unsubscribe();
        //If dialog was not closed manually close it by timeout
        setTimeout(()=>{
          disposable.unsubscribe();
        },100000);
      });

  }

  

  manageTask(task : Task) {
    this.projectNameError  = { isError : false, errorMessage : ''};
    this.priorityError  = { isError : false, errorMessage : ''};

    var projectNameEntered = this.angularForm.controls['projectName'].value;
    if(task.IsParentTask == false) {
    if(projectNameEntered == undefined || projectNameEntered == '' || projectNameEntered == null) {
      this.projectNameError={isError:true,errorMessage:'Please select project.'};
      return;
    }

    if(task.Priority == 0) {
      this.priorityError={isError:true,errorMessage:'Please select priority between 0 to 10.'};
      return;
    }

    if(task.UserId == undefined || task.UserId == null) {
      this.userError={isError:true,errorMessage:'Please select task owner.'};
      return;
    }

  }
    

    if(this.title == "Add Task") {
      if(task.IsParentTask) {
        this.service.createParentTask(task);
      }
      else {
        this.service.createTask(task);
      }
    }
    else {
      if(task.IsParentTask) {
        this.service.updateParentTask(task);
      }
      else {
        this.service.updateTask(task);
      }
    }

    this.service.serviceResponseReceived.subscribe((value) => {
      this._router.navigateByUrl('/ViewTask');
    });

  }

  



}
