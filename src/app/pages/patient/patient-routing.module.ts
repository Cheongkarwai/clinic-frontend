import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PatientComponent} from './patient.component';
import {ProductListComponent} from "./product-list/product-list.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AppointmentComponent} from "./appointment/appointment.component";
import {CheckoutComponent} from "./checkout/checkout.component";
import {CartComponent} from "./cart/cart.component";
import {ChatroomComponent} from "./chatroom/chatroom.component";
import {ProductDetailsComponent} from "./product-list/product-details/product-details.component";

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'product-list', component: ProductListComponent},
  {path:'product-details/:id',component:ProductDetailsComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'appointment', component: AppointmentComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'cart', component: CartComponent},
  {path: 'chatroom', component: ChatroomComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule {
}
