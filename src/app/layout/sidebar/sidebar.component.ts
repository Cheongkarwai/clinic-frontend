import {Component, inject, OnInit, TemplateRef, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {NgbOffcanvas, NgbOffcanvasModule} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  standalone:true,
  imports:[NgbOffcanvasModule],
  encapsulation:ViewEncapsulation.None
})
export class SidebarComponent implements OnInit {

  private offcanvasService = inject(NgbOffcanvas);
  isSidebarOpen = false;
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  toggle($event: MouseEvent) {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  logout(){
  }

  openCanvas(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { position: 'end',backdrop:false });
  }

}
