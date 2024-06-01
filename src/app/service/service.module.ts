import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceComponent } from './service.component';
import { MyTaskModule } from '../my-task/my-task.module';
import { ServiceRoutingModule } from './service-routing.module';
import { ToastModule } from 'primeng/toast/toast';
import { VolunteerComponent } from '../volunteer/volunteer.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
ServiceComponent,VolunteerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,ServiceRoutingModule,
    MyTaskModule,  

  ]
})
export class ServiceModule { }
