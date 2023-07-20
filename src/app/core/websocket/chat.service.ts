import { BehaviorSubject, Subject, map } from "rxjs";
import { Message } from "./message.interface";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Client } from "@stomp/stompjs";

@Injectable({
    providedIn: 'root'
})

export class ChatService {

    private client: Client;

    public messages$ = new BehaviorSubject<Message[]>([]);

    private messages = [];

    private API_URL = environment.API_URL;

    constructor(private httpClient: HttpClient) {
        this.client = new Client({
            brokerURL: environment.CHAT_URL,

        });
    }

    // public message$:Subject<Message>;

    // constructor(private wsService:WebSocketService){
    //     this.message$ = <Subject<Message>> wsService.connect(environment.CHAT_URL)
    //     .pipe(map((res:MessageEvent)=>{
    //         let data = JSON.parse(res.data);
    //         return {
    //             content:data.content
    //         }
    //     }));
    // }


    public connect() {

        // const client = new Client({
        //     brokerURL:environment.CHAT_URL,
        //     onConnect:()=>{
        //         client.subscribe('/app/hello',message=>{
        //             console.log(message.body);
        //         })

        //         client.publish({destination:'/app/hello',body:JSON.stringify({content:'Heeii'})});
        //     }
        // });


        // client.activate();
    }

    public subscribeToChat(sessionId:string) {

        this.client.onConnect = () => {

            //call api to create a chat session.
                    const messages = this.messages$.getValue();
                    this.client.subscribe(`/user/${sessionId}/queue/messages`, message => {
                        console.log(message);
                        messages.push(JSON.parse(message.body));
                        //this.messages$.next([...messages,JSON.parse(message.body)]);
                    });
        }

        console.log(this.client.state);

        this.client.activate();

    }

    public findChatSession(sender: string, recipient: string) {
        return this.httpClient.get(`${this.API_URL}/api/chat-sessions?senderId=${sender}&recipientId=${recipient}`, { responseType: 'text' });
    }

    public sendMessage(message: Message) {
        if (this.client.connected) {
            this.client.publish({ destination: `/app/hello/${message.recipientId}`, body: JSON.stringify(message) });
        }
    }



}