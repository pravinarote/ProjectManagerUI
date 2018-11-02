import { Component, OnInit } from '@angular/core';
import { DialogService } from 'ng2-bootstrap-modal';
import { SearchProjectComponent } from '../search-project/search-project.component';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  constructor(private dialogService:DialogService) { }

  ngOnInit() {
  }

  showConfirm() {
    let disposable = this.dialogService.addDialog(SearchProjectComponent, {
        title:'Confirm title', 
        message:'Confirm message'})
        .subscribe((isConfirmed)=>{
            //We get dialog result
            if(isConfirmed) {
                alert('accepted');
            }
            else {
                alert('declined');
            }
        });
    //We can close dialog calling disposable.unsubscribe();
    //If dialog was not closed manually close it by timeout
    setTimeout(()=>{
        disposable.unsubscribe();
    },10000);
}

}
