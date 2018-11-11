import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'

import { Observable, of, Subject} from 'rxjs'
import { map, catchError, filter, scan } from 'rxjs/operators'
import { webSocket } from 'rxjs/webSocket';
import { User } from '../models/user';
import { Project } from '../models/project';
import { Task } from '../models/task';

const endpoint = 'http://localhost:59969/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProjectManagerServiceService {

  isResponseReceived: boolean;
  serviceResponseReceived: Subject<boolean> = new Subject<boolean>();

  constructor(private http:HttpClient) { }

  getUsers(): Observable<User[]>  {
    return this.http.get<User[]>(endpoint + 'Users/GetAll');
  }

  getProjects(): Observable<Project[]>  {
    return this.http.get<Project[]>(endpoint + 'Projects/GetAll');
  }

  getParentTasks(): Observable<Task[]>  {
    return this.http.get<Task[]>(endpoint + 'ParentTasks/GetAll');
  }

  getTasks(): Observable<Task[]>  {
    return this.http.get<Task[]>(endpoint + 'Tasks/GetAll');
  }

  createTask(task : Task) {
    let body = JSON.stringify(task);
    console.log(body);
    let returnObject = false;
    this.http.post(endpoint + "Tasks/Create",
        body, httpOptions)
        .subscribe(
            data => {
                console.log("POST Request is successful ", data);
                returnObject = true;
                this.serviceResponseReceived.next(true);
            },
            error => {
                console.log("POST Error", error);
            }
        ); 
    return returnObject;
  }

  createParentTask(task : Task) {
    let body = JSON.stringify(task);
    console.log(body);
    let returnObject = false;
    this.http.post(endpoint + "ParentTasks/Create",
        body, httpOptions)
        .subscribe(
            data => {
                console.log("POST Request is successful ", data);
                returnObject = true;
                this.serviceResponseReceived.next(true);
            },
            error => {
                console.log("POST Error", error);
            }
        ); 
    return returnObject;
  }

  createUser(task : User) {
    let body = JSON.stringify(task);
    console.log(body);
    let returnObject = false;
    this.http.post(endpoint + "Users/Create",
        body, httpOptions)
        .subscribe(
            data => {
                
                returnObject = true;
                this.serviceResponseReceived.next(true);
            },
            error => {
                console.log("POST Error", error);
            }
        ); 
    return returnObject;
  }

  createProject(project : Project) {
    let body = JSON.stringify(project);
    console.log(body);
    let returnObject = false;
    this.http.post(endpoint + "Projects/Create",
        body, httpOptions)
        .subscribe(
            data => {
                console.log("POST Request is successful ", data);
                returnObject = true;
                this.serviceResponseReceived.next(true);
            },
            error => {
                console.log("POST Error", error);
            }
        ); 
    return returnObject;
  }

  updateParentTask(task : Task)  {
    let body = JSON.stringify(task);

    let returnObject = false;
    this.http.put(endpoint + "ParentTasks/Update",
        body, httpOptions)
        .subscribe(
            data => {
                console.log("PUT Request is successful ", data);
                returnObject = true;
                this.serviceResponseReceived.next(true);
            },
            error => {
                console.log("Error", error);
            }
        ); 
    return returnObject;
  }

  updateTask(task : Task)  {
    let body = JSON.stringify(task);

    let returnObject = false;
    this.http.put(endpoint + "Tasks/Update",
        body, httpOptions)
        .subscribe(
            data => {
                console.log("PUT Request is successful ", data);
                returnObject = true;
                this.serviceResponseReceived.next(true);
            },
            error => {
                console.log("Error", error);
            }
        ); 
    return returnObject;
  }

  updateUser(task : User)  {
    let body = JSON.stringify(task);

    let returnObject = false;
    this.http.put(endpoint + "Users/Update",
        body, httpOptions)
        .subscribe(
            data => {
                console.log("PUT Request is successful ", data);
                returnObject = true;
                this.serviceResponseReceived.next(true);
            },
            error => {
                console.log("Error", error);
            }
        ); 
    return returnObject;
  }

  updateProject(task : Project)  {
    let body = JSON.stringify(task);

    let returnObject = false;
    this.http.put(endpoint + "Projects/Update",
        body, httpOptions)
        .subscribe(
            data => {
                console.log("PUT Request is successful ", data);
                returnObject = true;
                this.serviceResponseReceived.next(true);
            },
            error => {
                console.log("Error", error);
            }
        ); 
    return returnObject;
  }

  getUserById(id) : Observable<User> {
    return this.http.get<User>(endpoint + 'Users/GetById/' + id);
  }

  getTaskById(id) : Observable<Task> {
    return this.http.get<Task>(endpoint + 'Tasks/GetById/' + id);
  }

  getParentTaskById(id) : Observable<Task> {
    return this.http.get<Task>(endpoint + 'ParentTasks/GetById/' + id);
  }

  deleteUser(id)  {
    
    this.http.delete(endpoint + "Users/Delete/" + id).subscribe(data=> {
      this.serviceResponseReceived.next(true);
    });
  }

  endTask(id)  {
    let returnObject = false;
    let body = JSON.stringify(id);
    this.http.post(endpoint + "Tasks/End/" + id,
        body, httpOptions)
        .subscribe(
            data => {
                console.log("End Request is successful ", data);
                returnObject = true;
                this.serviceResponseReceived.next(true);
            },
            error => {
                console.log("POST Error", error);
            }
        ); 
        return returnObject;


    // this.http.delete(endpoint + "Tasks/End/" + id).subscribe(data=> {
    //   this.serviceResponseReceived.next(true);
    // });
  }

}
