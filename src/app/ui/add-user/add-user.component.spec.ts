import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule,ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http'
import { RouterTestingModule } from '@angular/router/testing';
import { ProjectManagerServiceService } from 'src/app/services/project-manager-service.service';

import { AddUserComponent } from './add-user.component';
import { ProjectManagerMockService } from 'src/app/services/project-manager-mock-service';
import { Router } from '@angular/router';
import { RouterMock } from 'src/app/mock/route-mock';
import { SearchUserPipe } from 'src/app/pipes/search-user.pipe';
import { User } from 'src/app/models/user';

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule,HttpClientModule,RouterTestingModule,ReactiveFormsModule ],
      declarations: [ AddUserComponent,SearchUserPipe ],
      providers: [
        { provide: ProjectManagerServiceService, useClass: ProjectManagerMockService },
        { provide: FormBuilder, useClass: FormBuilder },
        { provide : Router, useClass : RouterMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserComponent);
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

  it('first name field validity', () => {
    let errors = {};
    let firstNameField = component.angularForm.controls['firstName'];
    errors = firstNameField.errors || {};
    expect(errors['required']).toBeTruthy(); 
  });

  it('last name field validity', () => {
    let errors = {};
    let lastNameField = component.angularForm.controls['lastName'];
    errors = lastNameField.errors || {};
    expect(errors['required']).toBeTruthy(); 
  });

  it('employee id field validity', () => {
    let errors = {};
    let employeeIdField = component.angularForm.controls['employeeId'];
    errors = employeeIdField.errors || {};
    expect(errors['required']).toBeTruthy(); 
  });

  it('first name field should be valid if some values are assigned but entire form should invalid', () => {
    let firstNameField = component.angularForm.controls['firstName'];
    firstNameField.setValue('Scott');
    expect(component.angularForm.controls['firstName'].valid).toBe(true); 
    expect(component.angularForm.valid).toBe(false); 
  });

  it('last name field should be valid if some values are assigned but entire form should invalid', () => {
    let firstNameField = component.angularForm.controls['lastName'];
    firstNameField.setValue('Scott');
    expect(component.angularForm.controls['lastName'].valid).toBe(true); 
    expect(component.angularForm.valid).toBe(false); 
  });

  it('employee id field should be valid if some values are assigned but entire form should invalid', () => {
    let firstNameField = component.angularForm.controls['employeeId'];
    firstNameField.setValue('Scott');
    expect(component.angularForm.controls['employeeId'].valid).toBe(true); 
    expect(component.angularForm.valid).toBe(false); 
  });

  it('if all fields has been supplied then form should be valid', () => {

    let firstName = component.angularForm.controls['firstName'];
    let lastName = component.angularForm.controls['lastName'];
    let employeeId = component.angularForm.controls['employeeId'];
    lastName.setValue('Philip');
    employeeId.setValue(1);
    firstName.setValue('Scotr');
    expect(component.angularForm.valid).toBe(true); 
  });

  it('should load all users ngOnInit', () => {
    component.ngOnInit();
    expect(component.userList.length).toBe(3);
  });

  it('should call update user', () => {
    const userToBeUpdated = new User();
    userToBeUpdated.FirstName = 'Scott 1';
    userToBeUpdated.UserId = 1;
    component.updateUser(userToBeUpdated);
  });

  it('should call delete user', () => {
    component.deleteUser(1);
    expect(component.userList.length).toBe(2); 
  });

  it('should call create user', () => {
    const userToBeCreated = new User();
    userToBeCreated.FirstName = 'Scott 1';
    userToBeCreated.UserId = 1;
    component.createUser(userToBeCreated);
    expect(component.userList.length).toBe(3); 
  });

  it('when onSortFirstName then list should be sorted', () => {
    component.onSortFirstName();
    var firstTask = component.userList[0];
    expect(firstTask.UserId).toBe(2);
  });

  it('when onSortLastName then list should be sorted', () => {
    component.onSortLastName();
    var firstTask = component.userList[0];
    expect(firstTask.UserId).toBe(3);
  });

  it('when onSortId then list should be sorted', () => {
    component.onSortId();
    var firstTask = component.userList[0];
    expect(firstTask.UserId).toBe(1);
  });

});
