import { ToastModule } from 'primeng/toast';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button'
import { MyTaskRoutingModule } from './my-task-routing.module';
import { TaskComponent } from './task.component';
import { MyTaskComponent } from './my-task/my-task.component';
import { SupervisorTaskComponent } from './supervisor-task/supervisor-task.component';
import { MyTaskService } from './my-task.service';
import { TableModule } from 'primeng/table';
import { SharedModule } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { EscapeHtmlPipe } from './Keephtml';
import { TabViewModule } from 'primeng/tabview';
import { DialogModule } from 'primeng/dialog';
// import { DemoComponent } from '../service/demo/demo.component';

@NgModule({
  imports: [
    DialogModule,
    CommonModule,
    TabViewModule,
    FormsModule,
    TableModule,
    MyTaskRoutingModule,
    MatButtonModule,
    ToastModule,
  ],
  declarations: [TaskComponent,
    MyTaskComponent,
    SupervisorTaskComponent,
    EscapeHtmlPipe],
  providers: [MyTaskService]
})
export class MyTaskModule {
}
