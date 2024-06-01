import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PersonComponent } from './person/person.component';
import { FieldsetModule } from 'primeng/fieldset';
import {MatExpansionModule} from '@angular/material/expansion';
import { BrowserAnimationsModule }  
    from "@angular/platform-browser/animations";
import { HomeComponent } from './home/home.component'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import { ApplicationFormComponent } from './application-form/application-form.component';
import { OrganizationRequestComponent } from './organization-request/organization-request.component';
import { Test1Component } from './test1/test1.component';
import { Test2Component } from './test2/test2.component';
import { StepsModule } from 'primeng/steps';
// import { VolunteerComponent } from './volunteer/volunteer.component';
import {MatStepperModule} from '@angular/material/stepper';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MonthPickerComponent } from './month-picker/month-picker.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { BackGroundStatusComponent } from './back-ground-status/back-ground-status.component';
import { LangaugeDialogComponent } from './langauge-dialog/langauge-dialog.component';
import { VolunteerFormComponent } from './volunteer-form/volunteer-form.component';
import { OrganizationsComponent } from './organizations/organizations.component';
import { MatCardModule } from '@angular/material/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { ServiceModule } from './service/service.module';
import { APP_BASE_HREF } from '@angular/common';
import { MyTaskModule } from './my-task/my-task.module';
@NgModule({
  declarations: [
    AppComponent,
    PersonComponent,
    HomeComponent,
    ApplicationFormComponent,
    OrganizationRequestComponent,
    Test1Component,
    Test2Component,
    
    // VolunteerComponent,
         MonthPickerComponent,
         BackGroundStatusComponent,
         LangaugeDialogComponent,
         VolunteerFormComponent,
         OrganizationsComponent
  ],
  imports: [
    BrowserModule,  
    MatCardModule,
    FileUploadModule,
    ToastModule,
    ServiceModule,
    MyTaskModule,
    TableModule,
    MatExpansionModule,
    MatExpansionModule,
    MatDialogModule,
    StepsModule,
    MatFormFieldModule, MatInputModule, MatIconModule,MatSelectModule,MatTabsModule,
    BrowserAnimationsModule, 
    MatIconModule, 
  FieldsetModule,
  MatStepperModule,
  FormsModule,
  AppRoutingModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    HttpClientModule,
    MatIconModule,
    MatRadioModule,
    MatNativeDateModule,
    MatStepperModule,
    MatDatepickerModule,
], 
  
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS,
    useValue: {displayDefaultIndicatorType: false},
  },{ provide: APP_BASE_HREF, useValue: window["_app_base"] },MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
