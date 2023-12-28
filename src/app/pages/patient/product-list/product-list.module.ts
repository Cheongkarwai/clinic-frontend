import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductListComponent} from "./product-list.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ScrollingModule} from "@angular/cdk/scrolling";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { ProductDetailsComponent } from './product-details/product-details.component';
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    ProductListComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ScrollingModule,
    FontAwesomeModule,
    MatButtonModule,
    MatIconModule,
    RouterModule
  ]
})
export class ProductListModule { }
