import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { PatientComponent } from './patient.component';
import {ProductListModule} from "./product-list/product-list.module";
import {MDBBootstrapModule} from "angular-bootstrap-md";
import {MatIconModule} from "@angular/material/icon";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {InquiryFormModule} from "./inquiry-form/inquiry-form.module";
import {DashboardModule} from "./dashboard/dashboard.module";
import {AppointmentModule} from "./appointment/appointment.module";
import {CheckoutModule} from "./checkout/checkout.module";
import {ProductBannerModule} from "../../components/product-banner/product-banner.module";
import {CartModule} from "./cart/cart.module";
import {ChatroomModule} from "./chatroom/chatroom.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ProductDetailsModule} from "./product-list/product-details/product-details.module";


@NgModule({
  declarations: [
    PatientComponent
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    ProductListModule,
    DashboardModule,
    AppointmentModule,
    CheckoutModule,
    CartModule,
    ChatroomModule,
  ]
})
export class PatientModule { }
