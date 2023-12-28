import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppointmentComponent} from "./appointment.component";
import {InquiryFormModule} from "../inquiry-form/inquiry-form.module";
import {NgModule} from "@angular/core";
import {CalendarModule, DateAdapter} from "angular-calendar";
import {adapterFactory} from "angular-calendar/date-adapters/date-fns";


@NgModule({
  declarations: [
    AppointmentComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    InquiryFormModule,
  ]
})
export class AppointmentModule { }
