import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ScrollingModule} from "@angular/cdk/scrolling";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {DashboardComponent} from "./dashboard.component";
import {BarChartComponent} from "../../../components/bar-chart/bar-chart.component";
import {MatListModule} from "@angular/material/list";
import {CountUpDirective} from "../../../core/directive/count-up.directive";


@NgModule({
  declarations: [
   DashboardComponent,
    BarChartComponent,
    CountUpDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ScrollingModule,
    MatListModule,
  ]
})
export class DashboardModule { }
