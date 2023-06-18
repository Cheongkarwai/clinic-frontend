import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaceOrderComponent } from './pages/place-order/place-order.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  {path:'product-list',component:ProductListComponent},
  {path:'place-order',component:PlaceOrderComponent},
  {path:'profile',component:ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
