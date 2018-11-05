import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { ProjectManagerServiceService } from 'src/app/services/project-manager-service.service';
import { Project } from 'src/app/models/project';
import { DialogService } from 'ng2-bootstrap-modal';
import { SearchComponent } from '../search/search.component';
import { Popup } from 'src/app/models/popup';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  project : Project= {
    StartDate : null,
    EndDate : null,
    IsDatesEnabled : false,
    ManagerId : 0,
    ManagerName : '',
    NoOfTasks : 0,
    NoOfTasksCompleted : 0,
    Priority : 0,
    ProjectId : 0,
    ProjectName : ''
  };
  operation : string;
  angularForm: FormGroup;
  projectList : Project[] = [];
  constructor(private service : ProjectManagerServiceService, private fb: FormBuilder, private dialogService:DialogService) {
    this.createForm();
   }

   initializeProject() {
    this.project = new  Project();
    this.project.StartDate = null;
    this.project.EndDate = null;
    this.project.IsDatesEnabled = false;
    this.project.ManagerId = 0;
    this.project.ManagerName ='';
    this.project.ProjectId=0;
    this.project.ProjectName = '';
    this.project.Priority = 0;
    this.angularForm.controls['enableDates'].setValue(false);
    this.angularForm.controls['endDate'].disable() ;
    this.angularForm.controls['startDate'].disable() ;
  }

  createForm() {
    this.operation = "Add";
    this.angularForm = this.fb.group({
      projectName: new FormControl({}, Validators.required),
      enableDates : new FormControl({value : false}),
      startDate : new FormControl({value : new Date(), disabled : true}),
      endDate : new FormControl({value : new Date(),disabled : true}),
      priority : new FormControl({value : 0}),
      manager : new FormControl({value:'',disabled : true}),
      projectId : new FormControl()
    });
  }

  error : any = { isError : false, errorMessage : ''};

  compareTwoDates() {
    if(new Date(this.angularForm.controls['endDate'].value)<new Date(this.angularForm.controls['startDate'].value)){
        this.error={isError:true,errorMessage:'End Date should not greater than start date.'};
    }
    else {
      this.error={isError:false};
    }
  }

  changeDates(enable : boolean) { 
    console.log(enable);
    if(enable) {
      this.angularForm.controls['endDate'].enable() ;
      this.angularForm.controls['startDate'].enable() ;
      this.angularForm.controls['startDate'].setValidators(Validators.required);
      this.angularForm.controls['endDate'].setValidators(Validators.required);
      var startdate = new Date();
      var endDate = new Date(startdate.getFullYear(),startdate.getMonth(),startdate.getDate() + 1);
      this.project.StartDate = startdate;
      this.project.EndDate = endDate;
    }
    else {
      this.angularForm.controls['endDate'].disable() ;
      this.angularForm.controls['startDate'].disable() ;
      this.angularForm.controls['startDate'].setValidators(null);
      this.angularForm.controls['endDate'].setValidators(null);
      this.project.StartDate  =null;
      this.project.EndDate = null;
    }
  }

  getProjects() {
    this.projectList = [];
    this.service.getProjects().subscribe((data: Project[])=>{
      console.log(data);
      this.projectList = data;
    });

  }

  createProject(project : Project) {
    if(project.ProjectId > 0) {
      this.service.updateProject(project);
    }
    else {
      this.service.createProject(project);
    }
    this.service.serviceResponseReceived.subscribe((value) => {
      this.createForm();
      this.initializeProject();
      this.getProjects();
    });
  }

  updateProject(project : Project) {
    this.operation = "Update";
    this.service.getUserById(project.ManagerId).toPromise().then(x=>{
      this.project.ProjectId = project.ProjectId;
      this.project.ProjectName = project.ProjectName;
      this.project.StartDate = project.StartDate;
      this.project.EndDate = project.EndDate;
      this.project.ManagerId = x.UserId;
      this.project.ManagerName = x.FirstName + ' ' + x.LastName;
      this.project.Priority = project.Priority;
  
      if(project.StartDate!=undefined && project.EndDate !=undefined) {
        this.angularForm.controls['enableDates'].setValue(true);
        this.angularForm.controls['endDate'].enable() ;
        this.angularForm.controls['startDate'].enable() ;
      }
    });

    
  }

  ngOnInit() {
    this.operation = "Add";
    this.getProjects();
  }
  
  popupModel :  Popup[];
  showPopup() {

    console.log('inside popup');

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
          title:'Search Project', 
          items : this.popupModel,
          message:'Confirm message'})
          .subscribe((row)=>{
              //We get dialog result
              if(row!=undefined) {
                  // alert('Row selected');
                  this.project.ManagerId = row.Id;
                  this.project.ManagerName = row.Name;
              }
              
          });
        //We can close dialog calling disposable.unsubscribe();
        //If dialog was not closed manually close it by timeout
        setTimeout(()=>{
          disposable.unsubscribe();
        },10000);

      } );

    
  }

  private getTime(date?: Date) {
    return date != null && date!=undefined ? new Date(date).getTime() : 0;
  }

  onSortStartDate() {
    if(this.projectList!=undefined && this.projectList.length > 0) {
      this.projectList.sort((x1,x2)=> {
        return this.getTime(x1.StartDate) - this.getTime(x2.StartDate)
      });
    }
  }

  onSortEndDate() {
    if(this.projectList!=undefined && this.projectList.length > 0) {
      this.projectList.sort((x1,x2)=> {
        return this.getTime(x1.EndDate) - this.getTime(x2.EndDate)
      });
    }
  }

  onSortPriority() {
    if(this.projectList!=undefined && this.projectList.length > 0) {
      this.projectList.sort((x1,x2)=> {
        return x1.Priority - x2.Priority;
      });
    }
  }

  onSortCompleted() {

  }

}
