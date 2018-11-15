import { Observable, of, Subject } from "rxjs";
import { Project } from "../models/project";
import { User } from "../models/user";
import { Task } from "../models/task";

export class ProjectManagerMockService {

    projectList : Project[];
    userList : User[];
    taskList : Task[];
    parentTaskList : Task[];
    serviceResponseReceived: Subject<boolean> = new Subject<boolean>();

    constructor() {
        this.projectList = [
            { ProjectName : 'Project 1', ProjectId : 1, Priority :47, StartDate : new Date(2010,10,1), EndDate : new Date(2018,10,1), IsDatesEnabled : false,IsSuspended:false,ManagerId:1,ManagerName:'Alan',NoOfCompletedTasks:12,NoOfTasks:0},
            { ProjectName : 'Project 1', ProjectId : 2, Priority :17, StartDate : new Date(2010,10,1), EndDate : new Date(2018,10,1), IsDatesEnabled : false,IsSuspended:false,ManagerId:1,ManagerName:'Alan',NoOfCompletedTasks:2,NoOfTasks:0},
            { ProjectName : 'Project 1', ProjectId : 3, Priority :27, StartDate : new Date(2010,10,1), EndDate : new Date(2018,10,1), IsDatesEnabled : false,IsSuspended:false,ManagerId:1,ManagerName:'Alan',NoOfCompletedTasks:22,NoOfTasks:0},
            { ProjectName : 'Project 1', ProjectId : 4, Priority :7, StartDate : new Date(2010,10,1), EndDate : new Date(2018,10,1), IsDatesEnabled : false,IsSuspended:false,ManagerId:1,ManagerName:'Alan',NoOfCompletedTasks:122,NoOfTasks:0}
        ];

        this.userList = [
            { FirstName :'Scott',LastName:'Philips',EmployeeId:'EMP001',UserId : 1 },
            { FirstName :'aScott1',LastName:'Philips1',EmployeeId:'EMP002',UserId : 2 },
            { FirstName :'Scott2',LastName:'aPhilips2',EmployeeId:'EMP003',UserId : 3 }
        ];

        this.taskList = [
            { TaskId : 1, TaskName : 'Task 1',UserId :1, ProjectId :1,ProjectName: 'Test',StartDate : new Date(2010,10,1), EndDate : new Date(2018,10,1),IsParentTask:false,IsTaskEnded:false,ParentTaskId:1,ParentTaskName:'P1',Priority:10, TaskStatusId:2,UserName:'Scott'  },
            { TaskId : 2, TaskName : 'Task 2',UserId :1, ProjectId :1,ProjectName: 'Test',StartDate : new Date(2010,1,1), EndDate : new Date(2018,11,1),IsParentTask:false,IsTaskEnded:false,ParentTaskId:1,ParentTaskName:'P1',Priority:1, TaskStatusId:1,UserName:'Scott'  }
        ];

        this.parentTaskList = [
            { TaskId : 1, TaskName : 'Parent Task 1',UserId :null, ProjectId :null,ProjectName: null,StartDate : null, EndDate : null,IsParentTask:false,IsTaskEnded:false,ParentTaskId:null,ParentTaskName:null,Priority:null, TaskStatusId:null,UserName:null  },
            { TaskId : 2, TaskName : 'Parent Task 2',UserId :null, ProjectId :null,ProjectName: null,StartDate : null, EndDate : null,IsParentTask:false,IsTaskEnded:false,ParentTaskId:null,ParentTaskName:null,Priority:null, TaskStatusId:null,UserName:null  }
        ];
    }

    getProjects(): Observable<any> {
        return of(this.projectList);
      } 

    getUsers(): Observable<any> {
        return of(this.userList);
      } 

    getTasks() : Observable<any> {
        return of(this.taskList);
      } 
    
    getParentTasks() : Observable<any> {
        return of(this.parentTaskList);
    } 

    createTask(task: Task) {
        this.taskList.push(task);
    }

    createParentTask(task: Task) {
        this.parentTaskList.push(task);
    }

    createUser(user : User) {
        this.userList.push(user)
    }

    createProject(project : Project) {
        this.projectList.push(project);
    }

    updateTask(task: Task) {
        var taskToBeUpdated = this.taskList.filter(x=> x.TaskId == task.TaskId)[0];
        taskToBeUpdated.TaskName = task.TaskName;
        taskToBeUpdated.ParentTaskName = task.ParentTaskName;
        taskToBeUpdated.ParentTaskId = task.ParentTaskId;
        taskToBeUpdated.Priority = task.Priority;
        taskToBeUpdated.StartDate = task.StartDate;
        taskToBeUpdated.EndDate = task.EndDate;
    }

    updateParentTask(task : Task)  {
        var taskToBeUpdated = this.parentTaskList.filter(x=> x.TaskId == task.TaskId)[0];
        taskToBeUpdated.TaskName = task.TaskName;
        taskToBeUpdated.ParentTaskName = task.ParentTaskName;
        taskToBeUpdated.ParentTaskId = task.ParentTaskId;
        taskToBeUpdated.Priority = task.Priority;
        taskToBeUpdated.StartDate = task.StartDate;
        taskToBeUpdated.EndDate = task.EndDate;
    }

    updateUser(task : User)  {
        var userToBeUpdated = this.userList.filter(x=>x.UserId == task.UserId)[0]
        userToBeUpdated.FirstName = 'TOM';
        userToBeUpdated.LastName = 'JAY';
        userToBeUpdated.EmployeeId = 'BOSS';
    }

    updateProject(task : Project)  {
        var project = this.projectList.filter(x=>x.ProjectId == task.ProjectId)[0];
        project.ProjectName = 'TRAF';
        project.ProjectId = 101;
    }

    getTaskById(id: any): Observable<Task> {
        return Observable.create(this.taskList.filter(x=> x.TaskId == id)[0]);
    }

    getUserById(id: any): Observable<User> {
        return Observable.create(this.userList.filter(x=> x.UserId == id)[0]);
    }

    endTask(id: any) {
        var taskToBeUpdated = this.taskList.filter(x=> x.TaskId == id)[0];
        taskToBeUpdated.IsTaskEnded = true;
    }

    deleteUser(id) {
        var taskToBeDeleted = this.userList.filter(x=> x.UserId == id)[0];
        this.userList = this.userList.splice(this.userList.indexOf(taskToBeDeleted),1);
    }

    suspendProject(id) {
        var project = this.projectList.filter(x=>x.ProjectId == id)[0];
        project.IsSuspended = true;
    }
}