import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PersonComponent } from './person/person.component';
import { HomeComponent } from './home/home.component';
import { OrganizationRequestComponent } from './organization-request/organization-request.component';
import { Test1Component } from './test1/test1.component';
import { Test2Component } from './test2/test2.component';
import { VolunteerComponent } from './volunteer/volunteer.component';
import { OrganizationsComponent } from './organizations/organizations.component';

const routes: Routes = [

  {
    path: 'volunteer',
    component: PersonComponent,
  }
 
 ,
 {
   path: 'Request',
   component: OrganizationRequestComponent,
   // component: VolunteerComponent,
 },
 {
  path: 'organization',
  component: OrganizationsComponent,
  // component: VolunteerComponent,
}
,
  {
    path: '*/Membership',
    redirectTo: '/task/MyTask',
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
