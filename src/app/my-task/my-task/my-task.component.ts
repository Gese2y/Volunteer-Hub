import { Component, OnInit } from '@angular/core';
import { MyTaskService } from '../my-task.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
// import { ServiceService } from 'src/app/service/service.service';
import { MessageService } from 'primeng/api'
import { ServiceServiceService } from 'src/app/service-service.service';
// import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-my-task',
  templateUrl: './my-task.component.html',
  styleUrls: ['./my-task.component.css'],
  providers: [MessageService]
})
export class MyTaskComponent implements OnInit {
  taskwaithing = 120;
  taskList: any[] = [];
  lockedpromise:any;
  loading = 0;
  messageAppNo:any;
  messageCache : any[] = [];
  messageObj = {
    currentMessage: null,
    currentMessageIndex: 0,
    messages: []
  };
  direction = {
    NEXT: 'd00',
    PREV: 'd01'
  };
  loadingMessage = false;
  messageDialogVisible = false;

  constructor(
    private serviceService: ServiceServiceService,
    private myTaskService: MyTaskService,
    private router: Router,
    private notificationsService: MessageService,
    private titleService: Title
  ) {
    this.titleService.setTitle("My Task");
  }
  ngOnInit() {
    this.getMyTask();
  }
  myTaskHasNoData: boolean = false;
  myTaskLoading: boolean = false;

  openModal() {
    this.messageDialogVisible = true;
  }

  closeModal() {
    this.messageDialogVisible = false;
  }

  getMyTask() {

    this.myTaskLoading = true;
    this.myTaskService.getMytasks().subscribe((taskList:any) => {

      this.taskList = Object.assign([], taskList['Table1']);
      this.myTaskLoading = false;
      if (this.taskList.length == 0) {
        this.myTaskHasNoData = true;
      } else {
        this.myTaskHasNoData = false;
      }

      this.taskList.sort((a, b) => {
        if (a.start_date < b.start_date) {
          return 1;
        } else if (a.start_date > b.start_date) {
          return -1;
        } else {
          return 0;
        }
      });

      let orderNo = 1;
      this.taskList = this.taskList.map(
        task => {
          task['orderNo'] = orderNo;
          orderNo++;
          return task;
        }
      );

    }, error => {
      this.myTaskLoading = false;
      console.log('error');
    });
  }


  //For message

  canGo(where:any) {
    if (this.messageObj.messages) {
      if (where == this.direction.NEXT) {
        return this.messageObj.currentMessageIndex < this.messageObj.messages.length - 1;
      }
      else if (where == this.direction.PREV) {
        return this.messageObj.currentMessageIndex > 0;
      }
      return false;
    }
    else {
      return false;
    }
  }

  navigateMessage(direction:any) {
    if (this.messageObj.messages ? this.messageObj.messages.length > 0 : false) {
      if (
        direction == this.direction.NEXT &&
        this.messageObj.currentMessageIndex < this.messageObj.messages.length - 1
      ) {
        this.messageObj.currentMessageIndex += 1;
        this.messageObj.currentMessage = this.messageObj.messages[
          this.messageObj.currentMessageIndex
        ]['remarks'];
      }
      else if (
        direction == this.direction.PREV &&
        this.messageObj.currentMessageIndex > 0
      ) {
        this.messageObj.currentMessageIndex -= 1;
        this.messageObj.currentMessage = this.messageObj.messages[
          this.messageObj.currentMessageIndex
        ]['remarks'];
      }
    }
  }

  showMessage(appNo:any, task:any) {
    if (appNo != this.messageAppNo) {
      let messageInCache = false;
      this.loadingMessage = true;

      this.messageObj.currentMessage = null;
      this.messageObj.currentMessageIndex = 0;
      this.messageObj.messages = [];

      this.messageCache.some(
        message => {
          if (message['appNo'] == appNo) {
            messageInCache = true;
            this.messageObj.messages = message['messages'];
            if (this.messageObj.messages) {
              this.messageObj.currentMessage = this.messageObj.messages[0]['remarks'];
            }
            this.loadingMessage = false;
            return true;
          }
          return false;
        }
      );

      if (!messageInCache) {
        this.serviceService.GetNote(appNo).subscribe(
          (result:any) => {
            this.messageObj.messages = result;
            if (this.messageObj.messages) {
              this.messageCache.push(
                {
                  appNo: this.messageAppNo,
                  messages: result
                }
              );
              this.messageObj.currentMessage = this.messageObj.messages[0]['remarks'];
            }
            this.loadingMessage = false;
          },
          error => {
            this.loadingMessage = false;
            console.error('message error :: ', error);
          }
        );
      }
    }
    this.openModal();
    this.messageAppNo = appNo;
  }
  //For message

  IsLockedBy_OtherUser(task:any) {
    this.lockedpromise = this.myTaskService.IsLockedBy_OtherUser(task.id).subscribe(message => {
      console.log("message task ", task);
      if (true) {
        this.go(task);
      } else {

        this.notificationsService.add({
          severity: 'error', summary: 'Error', detail:
            'This Application No is being Processed by another staff. ' +
            'Please choose another Application No. ' +
            '/ ይህን ማመልከቻ በሌላ ሰራተኛ እየተስተናገደ ስለሆነ እባክዎ ሌላ ማመልከቻ ቁጥር ይውሰዱ፡፡'
        })
      }
      // const toast = this.notificationsService.success('Sucess', message);
    },
      error => {
        console.log(error);
        if (error.status == '400') {
          const toast = this.notificationsService.add({ severity: 'error', summary: 'Error', detail: error.error.InnerException.Errors[0].message });

        } else {
          const toast = this.notificationsService.add({ severity: 'error', summary: 'Error', detail: 'Something Went Wrong..!!' });
        }
      });
  }

  go(task:any) {
    console.log("task.to_screen", task.to_screen);

    console.log(
      "path else :: ",
      "/services/1/" +
        task.todo_comment +
        "/" +
        task.task_types_id +
        "/" +
        task.tasks_id +
        "/" +
        task.service_details_id +
        "/" +
        task.id +
        "/" +
        task.to_screen
    );
    // this.router.navigateByUrl('/services/1/' + task.todo_comment + '/' + task.task_types_id + '/' + task.tasks_id + '/' + task.service_details_id + '/' + task.id + '/' + task.to_screen);
    location.replace(
      window["_app_base"] +
        "/services/1/" +
        task.todo_comment +
        "/" +
        task.task_types_id +
        "/" +
        task.tasks_id +
        "/" +
        task.service_details_id +
        "/" +
        task.id +
        "/" +
        task.to_screen
    );
    //this.showMessage(task.todo_comment, task);
    // }
    // a7a1e05e-32c2-4f44-ad58-306572c64593 for plot
    // da8c5bd4-ea3d-4f02-b1b2-38cf26d6d1ff for property
    // 9e0834e9-7ec2-460c-a5ed-7ade1204c7ee for certefcate

    // this.router.navigate(['/service/1']);
  }
}
function generateGuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
  });
  }