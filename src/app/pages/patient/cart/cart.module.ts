import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProductBannerModule} from "../../../components/product-banner/product-banner.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {CartComponent} from "./cart.component";
import {CommonModule} from "@angular/common";


@NgModule({
  declarations: [
    CartComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    ProductBannerModule
  ]
})
export class CartModule { }
