import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from "@angular/material/table";
import {TableComponent} from "../../../../components/table/table.component";
import {SelectionModel} from "@angular/cdk/collections";
import {MatPaginatorModule} from "@angular/material/paginator";


@Component({
  selector: 'app-manage-appointment',
  standalone: true,
  imports: [CommonModule, MatTableModule, TableComponent, MatPaginatorModule],
  templateUrl: './manage-appointment.component.html',
  styleUrls: ['./manage-appointment.component.css']
})
export class ManageAppointmentComponent implements OnInit {

  columns = [{key:'select',value:'Test'},{key:'no',value:'No'},{key:'appointment',value:'Appointment'},{key:'doctor',value:'Doctor'}];
  dataSource = [{no:'1',appointment:'Hello',doctor:"Cheong"}];

  constructor() { }

  ngOnInit(): void {
  }

}
