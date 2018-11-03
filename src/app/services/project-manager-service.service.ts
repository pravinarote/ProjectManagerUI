import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'

import { Observable, of, Subject} from 'rxjs'
import { map, catchError, filter, scan } from 'rxjs/operators'
import { webSocket } from 'rxjs/webSocket';
import { User } from '../models/user';

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

  createUser(task : User) {
    let body = JSON.stringify(task);
    console.log(body);
    let returnObject = false;
    this.http.post(endpoint + "Users/CreateUser",
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

  updateUser(task : User)  {
    let body = JSON.stringify(task);

    let returnObject = false;
    this.http.put(endpoint + "Users/UpdateUser",
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

  deleteUser(id)  {
    
    this.http.delete(endpoint + "Users/Delete/" + id).subscribe(data=> {
      this.serviceResponseReceived.next(true);
    });
  }

}