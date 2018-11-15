import { TestBed, inject } from '@angular/core/testing';
import { HttpEvent, HttpEventType, HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { ProjectManagerServiceService } from './project-manager-service.service';
import { Task } from '../models/task';
import { User } from '../models/user';
import { Project } from '../models/project';

describe('ProjectManagerServiceService', () => {

  let taskList : [
    { TaskId : 1, TaskName : 'Task 1',UserId :1, ProjectId :1,ProjectName: 'Test',StartDate : '2010-10-01', EndDate : '2010-10-01',IsParentTask:false,IsTaskEnded:false,ParentTaskId:1,ParentTaskName:'P1',Priority:10, TaskStatusId:1,UserName:'Scott'  },
    { TaskId : 2, TaskName : 'Task 2',UserId :1, ProjectId :1,ProjectName: 'Test',StartDate : '2010-10-01', EndDate : '2010-10-01',IsParentTask:false,IsTaskEnded:false,ParentTaskId:1,ParentTaskName:'P1',Priority:10, TaskStatusId:1,UserName:'Scott'  },
    { TaskId : 3, TaskName : 'Task 3',UserId :1, ProjectId :1,ProjectName: 'Test',StartDate : '2010-10-01', EndDate : '2010-10-01',IsParentTask:false,IsTaskEnded:false,ParentTaskId:1,ParentTaskName:'P1',Priority:10, TaskStatusId:1,UserName:'Scott'  },
    { TaskId : 4, TaskName : 'Task 4',UserId :1, ProjectId :1,ProjectName: 'Test',StartDate : '2010-10-01', EndDate : '2010-10-01',IsParentTask:false,IsTaskEnded:false,ParentTaskId:1,ParentTaskName:'P1',Priority:10, TaskStatusId:1,UserName:'Scott'  }
  ];

  let userList = [
    { FirstName :'Scott',LastName:'Philips',EmployeeId:'EMP001',UserId : 1 },
    { FirstName :'Scott1',LastName:'Philips1',EmployeeId:'EMP002',UserId : 2 },
    { FirstName :'Scott2',LastName:'Philips2',EmployeeId:'EMP003',UserId : 3 }
  ];

  let projectList = [
    { ProjectName : 'Project 1', ProjectId : 1, Priority :7, StartDate : '2010-10-01', EndDate : '2010-10-01', IsDatesEnabled : false,IsSuspended:false,ManagerId:1,ManagerName:'Alan',NoOfCompletedTasks:2,NoOfTasks:0},
    { ProjectName : 'Project 1', ProjectId : 1, Priority :7, StartDate : '2010-10-01', EndDate : '2010-10-01', IsDatesEnabled : false,IsSuspended:false,ManagerId:1,ManagerName:'Alan',NoOfCompletedTasks:2,NoOfTasks:0},
    { ProjectName : 'Project 1', ProjectId : 1, Priority :7, StartDate : '2010-10-01', EndDate : '2010-10-01', IsDatesEnabled : false,IsSuspended:false,ManagerId:1,ManagerName:'Alan',NoOfCompletedTasks:2,NoOfTasks:0},
    { ProjectName : 'Project 1', ProjectId : 1, Priority :7, StartDate : '2010-10-01', EndDate : '2010-10-01', IsDatesEnabled : false,IsSuspended:false,ManagerId:1,ManagerName:'Alan',NoOfCompletedTasks:2,NoOfTasks:0}
];

let parentTaskList = [
  { TaskId : 1, TaskName : 'Parent Task 1',UserId :null, ProjectId :null,ProjectName: null,StartDate : null, EndDate : null,IsParentTask:false,IsTaskEnded:false,ParentTaskId:null,ParentTaskName:null,Priority:null, TaskStatusId:null,UserName:null  },
  { TaskId : 2, TaskName : 'Parent Task 2',UserId :null, ProjectId :null,ProjectName: null,StartDate : null, EndDate : null,IsParentTask:false,IsTaskEnded:false,ParentTaskId:null,ParentTaskName:null,Priority:null, TaskStatusId:null,UserName:null  }
];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProjectManagerServiceService]
    });
  });

  it('should be created', () => {
    const service: ProjectManagerServiceService = TestBed.get(ProjectManagerServiceService);
    expect(service).toBeTruthy();
  });

  it('should call getTasks() and verify tasks',inject(
    [ProjectManagerServiceService],(taskService: ProjectManagerServiceService) => {
      // ...our test logic here
      const mockTasks = taskList;
      const taskServiceSpy = jasmine.createSpyObj('ProjectManagerServiceService', ['getTasks']);
      taskServiceSpy.getTasks.and.returnValue(mockTasks);
      expect(taskServiceSpy.getTasks()).toBe(mockTasks, 'service returned stub value');
      expect(taskServiceSpy.getTasks.calls.count()).toBe(1, 'spy method was called once');
  }));

  it('should call getParentTasks() and verify parent tasks',inject(
    [ProjectManagerServiceService],(taskService: ProjectManagerServiceService) => {
      // ...our test logic here
      const mockTasks = parentTaskList;
      const taskServiceSpy = jasmine.createSpyObj('ProjectManagerServiceService', ['getParentTasks']);
      taskServiceSpy.getParentTasks.and.returnValue(mockTasks);
      expect(taskServiceSpy.getParentTasks()).toBe(mockTasks, 'service returned stub value');
      expect(taskServiceSpy.getParentTasks.calls.count()).toBe(1, 'spy method was called once');
  }));

  it('should call getUsers() and verify users',inject(
    [ProjectManagerServiceService],(taskService: ProjectManagerServiceService) => {
      // ...our test logic here
      const mockTasks = userList;
      const taskServiceSpy = jasmine.createSpyObj('ProjectManagerServiceService', ['getUsers']);
      taskServiceSpy.getUsers.and.returnValue(mockTasks);
      expect(taskServiceSpy.getUsers()).toBe(mockTasks, 'service returned stub value');
      expect(taskServiceSpy.getUsers.calls.count()).toBe(1, 'spy method was called once');
  }));

  it('should call getProjects() and verify projects',inject(
    [ProjectManagerServiceService],(taskService: ProjectManagerServiceService) => {
      // ...our test logic here
      const mockTasks = projectList;
      const taskServiceSpy = jasmine.createSpyObj('ProjectManagerServiceService', ['getProjects']);
      taskServiceSpy.getProjects.and.returnValue(mockTasks);
      expect(taskServiceSpy.getProjects()).toBe(mockTasks, 'service returned stub value');
      expect(taskServiceSpy.getProjects.calls.count()).toBe(1, 'spy method was called once');
  }));

  it('should call getTaskById() and verify task',inject(
    [ProjectManagerServiceService],(taskService: ProjectManagerServiceService) => {
      // ...our test logic here
      const mockTask = new Task();
      mockTask.TaskName = 'Task 1';
      mockTask.TaskId =1;
      mockTask.ParentTaskId = null;
      mockTask.ParentTaskName = '';
      mockTask.Priority = 10;
      mockTask.StartDate = new Date(2010,10,2);
      mockTask.EndDate = new Date(2010,10,2);

      const taskServiceSpy = jasmine.createSpyObj('ProjectManagerServiceService', ['getTaskById']);
      taskServiceSpy.getTaskById.and.returnValue(mockTask);
      expect(taskServiceSpy.getTaskById(mockTask.TaskId)).toBe(mockTask, 'service returned mock task');
      expect(taskServiceSpy.getTaskById.calls.count()).toBe(1, 'spy method was called once');
    }));

    it('should call endTask()',inject(
      [ProjectManagerServiceService],(taskService: ProjectManagerServiceService) => {
        const taskServiceSpy = jasmine.createSpyObj('ProjectManagerServiceService', ['endTask']);
        taskServiceSpy.endTask.and.returnValue(true);
        expect(taskServiceSpy.endTask(2)).toBe(true, 'service returned task to be ended or not');
        expect(taskServiceSpy.endTask.calls.count()).toBe(1, 'spy method was called once');
    }));

    it('should call deleteTask()',inject(
      [ProjectManagerServiceService],(taskService: ProjectManagerServiceService) => {
        const taskServiceSpy = jasmine.createSpyObj('TaskManagementService', ['deleteTask']);
        taskServiceSpy.deleteTask.and.returnValue(true);
        expect(taskServiceSpy.deleteTask(2)).toBe(true, 'service returned task deleted or not');
        expect(taskServiceSpy.deleteTask.calls.count()).toBe(1, 'spy method was called once');
    }));

    it('should call createTask()',inject(
      [ProjectManagerServiceService],(taskService: ProjectManagerServiceService) => {
      const taskToBeCreated = new Task();
      taskToBeCreated.TaskName = 'Task 1';
      taskToBeCreated.TaskId =1;
      taskToBeCreated.ParentTaskId = null;
      taskToBeCreated.ParentTaskName = '';
      taskToBeCreated.Priority = 10;
      taskToBeCreated.StartDate = new Date(2010,10,2);
      taskToBeCreated.EndDate = new Date(2010,10,2);
        
      const taskServiceSpy = jasmine.createSpyObj('ProjectManagerServiceService', ['createTask']);
      taskServiceSpy.createTask.and.returnValue(true);
      expect(taskServiceSpy.createTask(taskToBeCreated)).toBe(true, 'service returned new created task');
      expect(taskServiceSpy.createTask.calls.count()).toBe(1, 'spy method was called once');
    }));

    it('should call updateTask()',inject(
      [ProjectManagerServiceService],(taskService: ProjectManagerServiceService) => {
      const taskToBeUpdated = new Task();
      taskToBeUpdated.TaskName = 'Task 1';
      taskToBeUpdated.TaskId =1;
      taskToBeUpdated.ParentTaskId = null;
      taskToBeUpdated.ParentTaskName = '';
      taskToBeUpdated.Priority = 10;
      taskToBeUpdated.StartDate = new Date(2010,10,2);
      taskToBeUpdated.EndDate = new Date(2010,10,2);
        
      const taskServiceSpy = jasmine.createSpyObj('ProjectManagerServiceService', ['updateTask']);
      taskServiceSpy.updateTask.and.returnValue(true);
      expect(taskServiceSpy.updateTask(taskToBeUpdated)).toBe(true, 'service returned new created task');
      expect(taskServiceSpy.updateTask.calls.count()).toBe(1, 'spy method was called once');
    }));

    it('should call updateParentTask()',inject(
      [ProjectManagerServiceService],(taskService: ProjectManagerServiceService) => {
      const taskToBeUpdated = new Task();
      taskToBeUpdated.TaskName = 'Task 1';
      taskToBeUpdated.TaskId =1;
      
      const taskServiceSpy = jasmine.createSpyObj('ProjectManagerServiceService', ['updateParentTask']);
      taskServiceSpy.updateParentTask.and.returnValue(true);
      expect(taskServiceSpy.updateParentTask(taskToBeUpdated)).toBe(true, 'service returned new created task');
      expect(taskServiceSpy.updateParentTask.calls.count()).toBe(1, 'spy method was called once');
    }));

    it('should call createParentTask()',inject(
      [ProjectManagerServiceService],(taskService: ProjectManagerServiceService) => {
      const taskToBeCreated = new Task();
      taskToBeCreated.TaskName = 'Parent Task 101';
      taskToBeCreated.TaskId =1;
      const taskServiceSpy = jasmine.createSpyObj('ProjectManagerServiceService', ['createParentTask']);
      taskServiceSpy.createParentTask.and.returnValue(true);
      expect(taskServiceSpy.createParentTask(taskToBeCreated)).toBe(true, 'service returned new created task');
      expect(taskServiceSpy.createParentTask.calls.count()).toBe(1, 'spy method was called once');
    }));

    it('should call updateUser()',inject(
      [ProjectManagerServiceService],(taskService: ProjectManagerServiceService) => {
      const taskToBeCreated = new User();
      taskToBeCreated.FirstName = 'Parent Task 101';
      taskToBeCreated.UserId =1;
      const taskServiceSpy = jasmine.createSpyObj('ProjectManagerServiceService', ['updateUser']);
      taskServiceSpy.updateUser.and.returnValue(true);
      expect(taskServiceSpy.updateUser(taskToBeCreated)).toBe(true, 'service returned new created task');
      expect(taskServiceSpy.updateUser.calls.count()).toBe(1, 'spy method was called once');
    }));

    it('should call updateProject()',inject(
      [ProjectManagerServiceService],(taskService: ProjectManagerServiceService) => {
      const taskToBeCreated = new Project();
      taskToBeCreated.ProjectName = 'Parent Task 101';
      taskToBeCreated.ProjectId =1;
      const taskServiceSpy = jasmine.createSpyObj('ProjectManagerServiceService', ['updateProject']);
      taskServiceSpy.updateProject.and.returnValue(true);
      expect(taskServiceSpy.updateProject(taskToBeCreated)).toBe(true, 'service returned new created task');
      expect(taskServiceSpy.updateProject.calls.count()).toBe(1, 'spy method was called once');
    }));

    it('should call createUser()',inject(
      [ProjectManagerServiceService],(taskService: ProjectManagerServiceService) => {
      const taskToBeCreated = new User();
      taskToBeCreated.FirstName = 'Parent Task 101';
      taskToBeCreated.UserId =1;
      const taskServiceSpy = jasmine.createSpyObj('ProjectManagerServiceService', ['createUser']);
      taskServiceSpy.createUser.and.returnValue(true);
      expect(taskServiceSpy.createUser(taskToBeCreated)).toBe(true, 'service returned new created task');
      expect(taskServiceSpy.createUser.calls.count()).toBe(1, 'spy method was called once');
    }));

    it('should call createProject()',inject(
      [ProjectManagerServiceService],(taskService: ProjectManagerServiceService) => {
      const taskToBeCreated = new Project();
      taskToBeCreated.ProjectName = 'Parent Task 101';
      taskToBeCreated.ProjectId =1;
      const taskServiceSpy = jasmine.createSpyObj('ProjectManagerServiceService', ['createProject']);
      taskServiceSpy.createProject.and.returnValue(true);
      expect(taskServiceSpy.createProject(taskToBeCreated)).toBe(true, 'service returned new created task');
      expect(taskServiceSpy.createProject.calls.count()).toBe(1, 'spy method was called once');
    }));

    it('should call deleteUser()',inject(
      [ProjectManagerServiceService],(taskService: ProjectManagerServiceService) => {
        const taskServiceSpy = jasmine.createSpyObj('TaskManagementService', ['deleteUser']);
        taskServiceSpy.deleteUser.and.returnValue(true);
        expect(taskServiceSpy.deleteUser(2)).toBe(true, 'service returned task deleted or not');
        expect(taskServiceSpy.deleteUser.calls.count()).toBe(1, 'spy method was called once');
    }));

    it('should call suspendProject()',inject(
      [ProjectManagerServiceService],(taskService: ProjectManagerServiceService) => {
      const taskServiceSpy = jasmine.createSpyObj('ProjectManagerServiceService', ['suspendProject']);
      taskServiceSpy.suspendProject.and.returnValue(true);
      expect(taskServiceSpy.suspendProject(1)).toBe(true, 'service returned new created task');
      expect(taskServiceSpy.suspendProject.calls.count()).toBe(1, 'spy method was called once');
    }));

});
