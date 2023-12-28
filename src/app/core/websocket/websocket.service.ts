import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Observer, catchError, map, switchAll } from "rxjs";
import {WebSocketSubject, webSocket} from 'rxjs/webSocket';
import {AnonymousSubject, Subject} from 'rxjs/internal/Subject';
import { Message } from "./message.interface";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";


const CHAT_URL = 'http://localhost:8080/api/chats';

@Injectable({
    providedIn:'root'
})
export class WebSocketService{


    constructor(private httpClient:HttpClient){}

    public findAllRecipientBySender(sender:String){
        return this.httpClient.get(`${CHAT_URL}/${sender}/recipients`);
    }

    // public subject$:Subject<Message>;

    // public recipientsList():Observable<string[]>{
    //     return this.recipientsList$.asObservable();
    // }
}