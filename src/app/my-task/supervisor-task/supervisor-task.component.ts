import {Component, OnInit} from '@angular/core';
import {MyTaskService} from '../my-task.service';
import { Title } from '@angular/platform-browser';
// import { ServiceService } from 'src/app/service/service.service';
import { MessageService } from 'primeng/api'
import { ServiceServiceService } from 'src/app/service-service.service';

@Component({
  selector: 'app-supervisor-task',
  templateUrl: './supervisor-task.component.html',
  styleUrls: ['./supervisor-task.component.css'],
  providers: [MessageService]
})
export class SupervisorTaskComponent implements OnInit {

  taskList:any;
  SuperviedUsers:any;
  selectedUser:any;
  selectedTask:any;

  constructor(private serviceService:ServiceServiceService, 
              private notificationsService:MessageService,
              private my_task_service:MyTaskService,
              private titleService: Title) {
                
                this.titleService.setTitle("Supervisor Task");
        }

  ngOnInit() {
    this.getSupervisedTask();
    this.GetSuperviedUsers();
  }

  getSupervisedTask() {
    this.my_task_service.getSupervisertasks().subscribe(tasks => {
      this.taskList = tasks;
      this.taskList = (Object.assign([], this.taskList.Table1));
      console.log('tasks', tasks);
      console.log('this.taskList', this.taskList);
    });
  }

  GetSuperviedUsers() {
    this.my_task_service.GetSuperviedUsers().subscribe(SuperviedUsers => {
      this.SuperviedUsers = SuperviedUsers;
      this.SuperviedUsers = (Object.assign([], this.SuperviedUsers));
      console.log('SuperviedUsers', SuperviedUsers);
      console.log('this.SuperviedUsers', this.SuperviedUsers);
    });
  }
/**
 * 
 * 
  openModal(modal, task) {
    this.selectedTask = task;
    this.ngxSmartModalService.getModal(modal).open();
  }

  closeModal(emp, modal) {
    /* this.deptSuspensionRecord.Suspended_By = customer.Customer_ID;
     console.log('closeing.....');
     console.log('closeing.....', customer.Customer_ID);*/
  //  this.ngxSmartModalService.getModal(modal).close();
  //}

  assign(modal:any) {
    this.my_task_service.AssignToUser(this.selectedTask.todo_comment, this.selectedTask.id, 'O',
      this.selectedUser, this.selectedTask.tasks_id).subscribe(message => {
        if (message) {
          const toast = this.notificationsService.add({
            severity:'success',summary:'Success',detail:'Task Assigned Successfully'
          });
        } else {
          const toast = this.notificationsService.add({severity:'error',summary:'Error',detail:'Assign Failed..'});
        }
      },
      error => {
        console.log(error);
        if (error.status == '400') {
          const toast = this.notificationsService.add({severity:'error',
                  summary:'Error',
                  detail:error.error.InnerException.Errors[0].message});

        } else {
          const toast = this.notificationsService.add({severity:'error'
           ,summary:'Error',
           detail:'Something Went Wrong...!',})
        }
      });

   
  }
}
