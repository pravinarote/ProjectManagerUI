import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router'
import { FormsModule,ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AddTaskComponent } from './ui/add-task/add-task.component';
import { ViewTaskComponent } from './ui/view-task/view-task.component';
import { EditTaskComponent } from './ui/edit-task/edit-task.component';
import { AddProjectComponent } from './ui/add-project/add-project.component';
import { AddUserComponent } from './ui/add-user/add-user.component';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { SearchProjectComponent } from './ui/search-project/search-project.component';


const appRoutes:Routes=[
  { path:'AddProject',component:AddProjectComponent },
  { path:'AddTask', component:AddTaskComponent},
  { path:'AddUser', component:AddUserComponent},
  { path:'ViewTask', component:ViewTaskComponent},
  { path:'EditTask/:id', component:EditTaskComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    AddTaskComponent,
    ViewTaskComponent,
    EditTaskComponent,
    AddProjectComponent,
    AddUserComponent,
    SearchProjectComponent
  ],
  imports: [
    BrowserModule,FormsModule, RouterModule.forRoot(appRoutes),
    HttpClientModule, ReactiveFormsModule,BootstrapModalModule.forRoot({container:document.body})
  ],
  //Don't forget to add the component to entryComponents section
  entryComponents: [
    SearchProjectComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
