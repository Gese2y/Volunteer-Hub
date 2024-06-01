import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceComponent } from './service.component';
import { RouterModule, Routes } from '@angular/router';
import { OrganizationsComponent } from '../organizations/organizations.component';


const routes: Routes = [
  
  {
    path: 'service/:id',
    component: OrganizationsComponent,
    pathMatch: 'prefix'
  }, {
    path: 'service',
    component: OrganizationsComponent,
    pathMatch: 'prefix'
  },
  {
    //path: 'services/:ServiceId/:SDP/:ServiceRegCode',
    path: 'services/:ServiceId/:SDP/:ServiceRegCode/:serviceProviderCode',
    component: ServiceComponent,
    pathMatch: 'prefix'
  },

  {
    
    path: 'services/:ServiceId/:SDP/:ServiceRegCode',
    // path: 'services/:ServiceId/:SDP/:ServiceRegCode/:serviceProviderCode',
    component: ServiceComponent,
    pathMatch: 'prefix'
  },
  {
    
    path: 'service/:formcode/:AppNo/:TaskId/:DocId/:todoid/:TaskStatus',
    component: ServiceComponent,
    pathMatch: 'prefix'
  },
  {
    path: "services/:id/:AppNo/:tskTyp/:tskID/:docid/:todoID/:formcode",
    component: ServiceComponent,
    pathMatch: "prefix",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceRoutingModule {}
