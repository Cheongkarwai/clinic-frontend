import { Component, OnInit } from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css'],
  standalone:true,
  imports: [CommonModule, RouterOutlet]
})
export class AppointmentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
