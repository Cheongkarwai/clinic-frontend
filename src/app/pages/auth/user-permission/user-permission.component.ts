import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-permission',
  templateUrl: './user-permission.component.html',
  styleUrls: ['./user-permission.component.css'],
  standalone: true,
  imports:[NgbNavModule,CommonModule]
})
export class UserPermissionComponent implements OnInit {

  selectedTabIndex:number = 1;

  constructor() { }

  ngOnInit(): void {
  }

  navigateToTab(index:number){
    this.selectedTabIndex = index;
  }

}
