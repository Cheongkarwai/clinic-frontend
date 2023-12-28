import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/core/websocket/chat.service';
import { WebSocketService } from 'src/app/core/websocket/websocket.service';
import { Message } from "../../../core/websocket/message.interface";
import { BehaviorSubject, Observable, Subject, scan } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {

  messages$ = new Observable<Message[]>();

  textMessage:string = '';

  recipient:string = ''

  sender:string = ''

  recipientsList:string[] = [];

  constructor(private chatService:ChatService,private wsService:WebSocketService,private authService:AuthService) { }

  ngOnInit(): void {
    this.sender = this.authService.getUsername();
    this.messages$ = this.chatService.messages$.asObservable();
    this.wsService.findAllRecipientBySender(this.sender).subscribe((res:any)=>this.recipientsList = res);
    //this.wsService.findAllRecipientBySender(this.authService.getUsername()).subscribe(res=>console.log(res));
  }

  connect(recipient:string){
    this.recipient = recipient;
    this.chatService.findChatSession(this.sender,recipient)
                  .subscribe(sessionId=>this.chatService.subscribeToChat(sessionId));
  }

  sendMessage(event:any){
    this.chatService.sendMessage({content:this.textMessage,senderId:this.sender,recipientId:this.recipient,timestamp:new Date()});
    this.textMessage = '';
  }

}
