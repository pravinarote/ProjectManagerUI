import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule,ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http'
import { RouterTestingModule } from '@angular/router/testing';
import { ProjectManagerServiceService } from 'src/app/services/project-manager-service.service';
import { DialogService } from 'ng2-bootstrap-modal';


import { AddProjectComponent } from './add-project.component';
import { SearchProjectPipe } from 'src/app/pipes/search-project.pipe';
import { ProjectManagerMockService } from 'src/app/services/project-manager-mock-service';
import { Project } from 'src/app/models/project';


describe('AddProjectComponent', () => {
  let component: AddProjectComponent;
  let fixture: ComponentFixture<AddProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule,HttpClientModule,RouterTestingModule,ReactiveFormsModule ],
      declarations: [ AddProjectComponent ,SearchProjectPipe],
      providers: [
        { provide: ProjectManagerServiceService, useClass: ProjectManagerMockService },
        { provide: FormBuilder, useClass: FormBuilder },
        { provide: DialogService, useClass: DialogService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("When No Values filled form should be invalid", () => { 
    expect(component).toBeTruthy(); 
    expect(component.angularForm.valid).toBe(false); 
  });

  it('project name field validity', () => {
    let errors = {};
    let firstNameField = component.angularForm.controls['projectName'];
    errors = firstNameField.errors || {};
    expect(errors['required']).toBeTruthy(); 
  });

  it('start date field validity', () => {
    let errors = {};
    let firstNameField = component.angularForm.controls['startDate'];
    errors = firstNameField.errors || {};
    expect(errors['required']).toBeFalsy(); 
  });

  it('end date field validity', () => {
    let errors = {};
    let firstNameField = component.angularForm.controls['endDate'];
    errors = firstNameField.errors || {};
    expect(errors['required']).toBeFalsy(); 
  });

  it('priority field validity', () => {
    let errors = {};
    let firstNameField = component.angularForm.controls['priority'];
    errors = firstNameField.errors || {};
    expect(errors['required']).toBeFalsy(); 
  });

  it('project name field should be valid if some values are assigned but entire form should be valid', () => {
    let firstNameField = component.angularForm.controls['projectName'];
    firstNameField.setValue('Scott');
    expect(component.angularForm.controls['projectName'].valid).toBe(true); 
    expect(component.angularForm.valid).toBe(true); 
  });

  it('should load all project ngOnInit', () => {
    component.ngOnInit();
    expect(component.projectList.length).toBe(4);
  });

  it('should call update project', () => {
    const userToBeUpdated = new Project();
    userToBeUpdated.ProjectName = 'Scott 1';
    userToBeUpdated.Priority = 1;
    component.updateProject(userToBeUpdated);
  });

  it('should call suspend project', () => {
    component.suspendProject(1);
    expect(component.project.IsSuspended).toBeFalsy();
  });

  it('should call showPopup for users', () => {
    component.showPopup();
    expect(component.popupModel.length).toBe(0);
  });

  it('when onSortStartDate then list should be sorted', () => {
    component.onSortStartDate();
    var firstTask = component.projectList[0];
    expect(firstTask.ProjectId).toBe(1);
  });

  it('when onSortEndDate then list should be sorted', () => {
    component.onSortEndDate();
    var firstTask = component.projectList[0];
    expect(firstTask.ProjectId).toBe(1);
  });

  it('when onSortPriority then list should be sorted', () => {
    component.onSortPriority();
    var firstTask = component.projectList[0];
    expect(firstTask.ProjectId).toBe(4);
  });

  it('when onSortCompleted then list should be sorted', () => {
    component.onSortCompleted();
    var firstTask = component.projectList[0];
    expect(firstTask.ProjectId).toBe(2);
  });

});
