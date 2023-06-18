import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination-control',
  templateUrl: './pagination-control.component.html',
  styleUrls: ['./pagination-control.component.css']
})
export class PaginationControlComponent implements OnInit {


  @Input() totalPages:number | undefined = 0;

  @Output() onClick = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  getCurrentPage(page:number){
    this.onClick.emit(page);
  }

}
