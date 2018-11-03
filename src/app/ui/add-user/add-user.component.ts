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
  angularForm: FormGroup;
  userList : User[] = [];

  constructor(private service : ProjectManagerServiceService, private _router: Router, private fb: FormBuilder) {
    this.user = new User();
    this.createForm();
   }

  createForm() {
    this.angularForm = this.fb.group({
      firstName: ['', Validators.required ],
      lastName : ['',Validators.required],
      employeeId : ['',Validators.required]
    });
  }

  getUsers() {
    this.userList = [];
    this.service.getUsers().subscribe((data: User[])=>{
      console.log(data);
      this.userList = data;
    });
  }

  ngOnInit() {
  }

}
