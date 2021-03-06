import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { User } from 'src/app/models/user';
import { ProjectManagerServiceService } from 'src/app/services/project-manager-service.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  user : User;
  operation : string;
  angularForm: FormGroup;
  userList : User[] = [];
  searchText : string;

  constructor(private service : ProjectManagerServiceService, private _router: Router, private fb: FormBuilder) {
    this.user = new User();
    this.createForm();
   }

  createForm() {
    this.operation = "Add";
    this.user = new User();
    this.angularForm = this.fb.group({
      firstName: ['', Validators.required ],
      lastName : ['',Validators.required],
      employeeId : ['',Validators.required],
      userId : []
    });
  }

  getUsers() {
    this.userList = [];
    this.service.getUsers().subscribe((data: User[])=>{
      console.log(data);
      this.userList = data;
    });
  }

  onSortFirstName() {
    if(this.userList!=undefined && this.userList.length > 0) {

      this.userList.sort((x1,x2)=> {
        const name1 = x1.FirstName.toLowerCase();
        const name2 = x2.FirstName.toLowerCase();
        if (name1 > name2) { return 1; }
        if (name1 < name2) { return -1; }
        return 0;
      });
    }
  }

  onSortLastName() {
    if(this.userList!=undefined && this.userList.length > 0) {

      this.userList.sort((x1,x2)=> {
        const name1 = x1.LastName.toLowerCase();
        const name2 = x2.LastName.toLowerCase();
        if (name1 > name2) { return 1; }
        if (name1 < name2) { return -1; }
        return 0;
      });
    }
  }

  onSortId() {
    if(this.userList!=undefined && this.userList.length > 0) {

      this.userList.sort((x1,x2)=> {
        const name1 = x1.EmployeeId.toLowerCase();
        const name2 = x2.EmployeeId.toLowerCase();
        if (name1 > name2) { return 1; }
        if (name1 < name2) { return -1; }
        return 0;
      });
    }
  }

  ngOnInit() {
    this.operation = "Add";
    this.getUsers();
  }

  createUser(user : User) {
    console.log(user.UserId);
    if(user.UserId > 0) {
      this.service.updateUser(user);
    }
    else {
      this.service.createUser(user);
    }
    this.service.serviceResponseReceived.subscribe((value) => {
      this.createForm();
      this.getUsers();
    });
  }

  updateUser(user : User) {
    this.operation = "Update";
    this.user.FirstName = user.FirstName;
    this.user.LastName = user.LastName;
    this.user.EmployeeId = user.EmployeeId;
    this.user.UserId = user.UserId;
    this.angularForm.patchValue({
      firstName : user.FirstName,
      lastName : user.LastName,
      employeeId : user.EmployeeId,
      userId : user.UserId
    });
  }

  deleteUser(id : number) {
    this.service.deleteUser(id);
    this.service.serviceResponseReceived.subscribe((value) => {
      this.getUsers();
    });
  }

}
