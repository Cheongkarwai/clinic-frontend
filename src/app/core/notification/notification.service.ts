import {HttpClient} from "@angular/common/http";
import {Injectable, NgZone} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {Notification} from "./notification.interface";

@Injectable({
  providedIn:'root'
})
export class NotificationService{

  // @ts-ignore
  private notification$:BehaviorSubject<Notification> = new BehaviorSubject<Notification>(null);
  private unreadNotificationCount:BehaviorSubject<number>  = new BehaviorSubject<number>(0);


  constructor(private httpClient:HttpClient,private zone:NgZone) {
  }

  getNotificationObservable(){

    this.getNotification().subscribe(res=>{

    });

    const eventSource = new EventSource('http://localhost:8080/api/v1/notifications/endpoint');

    eventSource.onmessage = event=>{
      this.zone.run(()=>{
        this.notification$.next(JSON.parse(event.data));
      });
    }
    return this.notification$.asObservable();
  }

  getNotification(){
    return this.httpClient.get<Notification[]>('http://localhost:8080/api/v1/notifications');
  }
}
