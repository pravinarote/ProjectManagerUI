import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule,ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http'
import { RouterTestingModule } from '@angular/router/testing';
import { ProjectManagerServiceService } from 'src/app/services/project-manager-service.service';
import { DialogService } from 'ng2-bootstrap-modal';

import { ViewTaskComponent } from './view-task.component';
import { ProjectManagerMockService } from 'src/app/services/project-manager-mock-service';
import { Router } from '@angular/router';
import { RouterMock } from 'src/app/mock/route-mock';
import { Task } from 'src/app/models/task';

describe('ViewTaskComponent', () => {
  let component: ViewTaskComponent;
  let fixture: ComponentFixture<ViewTaskComponent>;
  let router : Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule,HttpClientModule,RouterTestingModule,ReactiveFormsModule ],
      declarations: [ ViewTaskComponent ],
      providers: [
        { provide: ProjectManagerServiceService, useClass: ProjectManagerMockService },
        { provide : Router, useClass : RouterMock},
        { provide: DialogService, useClass: DialogService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call update task', () => {
    const taskToBeUpdated = new Task();
    taskToBeUpdated.TaskName = 'Task 1';
    taskToBeUpdated.TaskId = 1;
    component.editTask(taskToBeUpdated);
  });

  it('should load all tasks ngOnInit', () => {
    component.ngOnInit();
    expect(component.taskList.length).toBe(2);
  });

  it('should call showProject', () => {
    component.showProjects();
    expect(component.popupModel.length).toBe(0);
  });

  it('when end task called then validate task', () => {
    component.endTask(1);
    var endedTask = component.taskList.filter(x=> x.TaskId == 1)[0];
    expect(endedTask.IsTaskEnded).toBeTruthy();
  });

  it('when onSortStartDate then list should be sorted', () => {
    component.onSortStartDate();
    var firstTask = component.taskList[0];
    expect(firstTask.TaskId).toBe(2);
  });

  it('when onSortEndDate then list should be sorted', () => {
    component.onSortEndDate();
    var firstTask = component.taskList[0];
    expect(firstTask.TaskId).toBe(1);
  });

  it('when onSortPriority then list should be sorted', () => {
    component.onSortPriority();
    var firstTask = component.taskList[0];
    expect(firstTask.TaskId).toBe(2);
  });

  it('when onSortTaskCompletion then list should be sorted', () => {
    component.onSortTaskCompletion();
    var firstTask = component.taskList[0];
    expect(firstTask.TaskId).toBe(2);
  });

});
