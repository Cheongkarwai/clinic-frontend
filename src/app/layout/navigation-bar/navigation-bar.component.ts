import { Component, OnInit } from '@angular/core';
import {faBell} from "@fortawesome/free-solid-svg-icons";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {NotificationComponent} from "../../components/notification/notification.component";
import {BehaviorSubject, Observable} from "rxjs";

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css'],

})
export class NavigationBarComponent implements OnInit {

  faBell = faBell;
  enterAnimationDuration = "10ms";
  exitAnimationDuration = "10ms";
  unreadNotificationCount$ = new Observable<number>();
  constructor(private dialog:MatDialog) { }

  ngOnInit(): void {
    const test = new BehaviorSubject<number>(5);
    this.unreadNotificationCount$ = test.asObservable();
  }

  openNotification(event:any,enterAnimationDuration:string,exitAnimationDuration:string){
    const dialogRef = this.dialog.open(NotificationComponent, {
      height: '400px',
      width: '600px',
      enterAnimationDuration,
      exitAnimationDuration
    });
  }


}
