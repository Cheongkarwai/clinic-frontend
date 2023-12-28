import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProductBannerModule} from "../../../components/product-banner/product-banner.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ChatroomComponent} from "./chatroom.component";


@NgModule({
  declarations: [
    ChatroomComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ProductBannerModule,
    FontAwesomeModule
  ]
})
export class ChatroomModule { }
