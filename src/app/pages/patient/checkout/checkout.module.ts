import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CheckoutComponent} from "./checkout.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppModule} from "../../../app.module";
import {ProductBannerComponent} from "../../../components/product-banner/product-banner.component";
import {ProductBannerModule} from "../../../components/product-banner/product-banner.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatStepperModule} from "@angular/material/stepper";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatRadioModule} from "@angular/material/radio";
import {NgxPayPalModule} from "ngx-paypal";


@NgModule({
  declarations: [
    CheckoutComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ProductBannerModule,
    FontAwesomeModule,
    MatStepperModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    NgxPayPalModule,
  ]
})
export class CheckoutModule { }
