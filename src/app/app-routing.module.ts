import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaceOrderComponent } from './pages/place-order/place-order.component';
import { ProductListComponent } from './pages/patient/product-list/product-list.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ChatroomComponent } from './pages/patient/chatroom/chatroom.component';
import { LoginComponent } from './pages/login/login.component';
import { LoginGuard } from './core/shared/login.guard';
import { UserPermissionComponent } from './pages/auth/user-permission/user-permission.component';
import { AuthGuard } from './core/auth-guard';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { RecoverPasswordComponent } from './pages/recover-password/recover-password.component';
import { CartComponent } from './pages/patient/cart/cart.component';
import { CheckoutComponent } from './pages/patient/checkout/checkout.component';
import { InquiryFormComponent } from './pages/patient/inquiry-form/inquiry-form.component';
import { AppointmentComponent } from './pages/patient/appointment/appointment.component';
import { DashboardComponent } from './pages/patient/dashboard/dashboard.component';


const routes: Routes = [
  // {path:'',component:DashboardComponent},
  // {path:'product-list',component:ProductListComponent},
  // {path:'place-order',component:PlaceOrderComponent},
  // {path:'profile',component:ProfileComponent,canActivate:[AuthGuard]},
  // {path:'chatroom',component:ChatroomComponent},
  // {path:'login',component:LoginComponent,canActivate:[LoginGuard]},
  // {path:'user-permission',component:UserPermissionComponent},
  // {path:'forgot-password',component:ForgotPasswordComponent},
  // {path:'change-password',component:RecoverPasswordComponent},
  // {path:'cart',component:CartComponent},
  // {path:'checkout',component:CheckoutComponent,canActivate:[AuthGuard]},
  // {path:'appointment',component:AppointmentComponent},
  // {path:'dashboard',component:DashboardComponent},
  { path: 'admin', loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule) },
  { path: '', loadChildren: () => import('./pages/patient/patient.module').then(m => m.PatientModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
