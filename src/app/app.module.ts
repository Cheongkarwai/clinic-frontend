import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { PlaceOrderComponent } from './pages/place-order/place-order.component';
import { RouterModule } from '@angular/router';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { NavigationBarComponent } from './layout/navigation-bar/navigation-bar.component';
import { PaginationControlComponent } from './components/pagination-control/pagination-control.component';
import { EditFormComponent } from './components/edit-form/edit-form.component';
import { ProfileComponent } from './pages/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    PlaceOrderComponent,
    ProductListComponent,
    NavigationBarComponent,
    PaginationControlComponent,
    EditFormComponent,
    ProfileComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
