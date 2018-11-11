import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router'
import { FormsModule,ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AddTaskComponent } from './ui/add-task/add-task.component';
import { ViewTaskComponent } from './ui/view-task/view-task.component';
import { AddProjectComponent } from './ui/add-project/add-project.component';
import { AddUserComponent } from './ui/add-user/add-user.component';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { SearchComponent } from './ui/search/search.component';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { SearchUserPipe } from './pipes/search-user.pipe';
import { SearchProjectPipe } from './pipes/search-project.pipe';


const appRoutes:Routes=[
  { path:'AddProject',component:AddProjectComponent },
  { path:'AddTask', component:AddTaskComponent},
  { path:'AddUser', component:AddUserComponent},
  { path:'ViewTask', component:ViewTaskComponent},
  { path:'EditTask/:id/:parent', component:AddTaskComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    AddTaskComponent,
    ViewTaskComponent,
    AddProjectComponent,
    AddUserComponent,
    SearchComponent,
    SearchFilterPipe,
    SearchUserPipe,
    SearchProjectPipe
  ],
  imports: [
    BrowserModule,FormsModule, RouterModule.forRoot(appRoutes),
    HttpClientModule, ReactiveFormsModule,BootstrapModalModule.forRoot({container:document.body})
  ],
  //Don't forget to add the component to entryComponents section
  entryComponents: [
    SearchComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
