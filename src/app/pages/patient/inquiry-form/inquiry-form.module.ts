import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ScrollingModule} from "@angular/cdk/scrolling";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {InquiryFormComponent} from "./inquiry-form.component";


@NgModule({
  declarations: [
    InquiryFormComponent,
  ],
  exports: [
    InquiryFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class InquiryFormModule { }
