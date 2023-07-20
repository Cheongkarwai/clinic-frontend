import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/core/websocket/chat.service';
import { WebSocketService } from 'src/app/core/websocket/websocket.service';
import { Message } from "../../core/websocket/message.interface";
import { BehaviorSubject, Observable, Subject, scan } from 'rxjs';

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

  constructor(private chatService:ChatService,private wsService:WebSocketService) { }

  ngOnInit(): void {
    this.messages$ = this.chatService.messages$.asObservable();
  }

  connect(){
    this.chatService.findChatSession(this.sender,this.recipient)
                  .subscribe(sessionId=>this.chatService.subscribeToChat(sessionId));
  }



  sendMessage(){
    this.chatService.sendMessage({content:this.textMessage,senderId:this.sender,recipientId:this.recipient,timestamp:new Date()});
  }

}
