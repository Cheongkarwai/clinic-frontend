import {Component, OnDestroy, OnInit} from '@angular/core';
import {NotificationService} from "../../core/notification/notification.service";
import {Notification} from '../../core/notification/notification.interface';
import {combineLatest, map, Observable, Subject, takeUntil, withLatestFrom} from "rxjs";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit,OnDestroy {

  notifications$ = new Observable<Notification[]>();
  unsubscribe:Subject<void> = new Subject<void>();

  constructor(private notificationService:NotificationService) { }

  ngOnInit(): void {
    this.notifications$ = combineLatest([this.notificationService.getNotification(),this.notificationService.getNotificationObservable()])
      .pipe(map(([first,second])=>{
       if(second !== null){
         first.push(second);
       }
        return first;
      }),takeUntil(this.unsubscribe));

  }

  ngOnDestroy() {
    //
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }


}
