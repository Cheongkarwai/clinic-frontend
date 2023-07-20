import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaceOrderComponent } from './pages/place-order/place-order.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ChatroomComponent } from './pages/chatroom/chatroom.component';
import { LoginComponent } from './pages/login/login.component';
import { LoginGuard } from './core/shared/login.guard';
import { UserPermissionComponent } from './pages/auth/user-permission/user-permission.component';
import { AuthGuard } from './core/auth-guard';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { RecoverPasswordComponent } from './pages/recover-password/recover-password.component';


const routes: Routes = [
  {path:'product-list',component:ProductListComponent},
  {path:'place-order',component:PlaceOrderComponent},
  {path:'profile',component:ProfileComponent,canActivate:[AuthGuard]},
  {path:'chatroom',component:ChatroomComponent},
  {path:'login',component:LoginComponent,canActivate:[LoginGuard]},
  {path:'user-permission',component:UserPermissionComponent},
  {path:'forgot-password',component:ForgotPasswordComponent},
  {path:'change-password',component:RecoverPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
