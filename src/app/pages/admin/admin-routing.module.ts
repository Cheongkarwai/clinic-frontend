import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import {AppointmentComponent} from "./appointment/appointment.component";
import {ManageAppointmentComponent} from "./appointment/manage-appointment/manage-appointment.component";

const routes: Routes = [
  { path: '', component: AdminComponent },
  {path:'patients',component:AppointmentComponent,children:[{
    path:'manage-appointments',component:ManageAppointmentComponent
    }]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
