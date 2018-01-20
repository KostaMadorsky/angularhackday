import { Component, OnInit } from '@angular/core';
import { HubConnection } from '@aspnet/signalr-client';
import { HttpClient } from '@angular/common/http';

interface Message {
  text: string;
  author: string;
}

@Component({
  selector: 'hd-chat-host',
  templateUrl: './chat-host.component.html',
  styleUrls: ['./chat-host.component.css']
})

export class ChatHostComponent implements OnInit {
  private _hubConnection: HubConnection;
  messages: Message[];
  private _msgName = 'messageReceived';
  private _roomName = 'team1';
  author: string;
  private _hub = 'https://angularhackday.azurewebsites.net/chat';
  private _msgApi = 'https://angularhackday.azurewebsites.net/api/messages';

  text: string;

  constructor(private _http: HttpClient) {
    this.messages = [];
    this.author = 'konst';
  }

  ngOnInit() {
    this._hubConnection = new HubConnection(this._hub);
    this._hubConnection.on(this._msgName, (msg: Message) =>
      this.messages.push(msg)
    );
    this._hubConnection.start().then(() => {
      this._hubConnection.invoke('JoinRoom', this._roomName);
    });
  }

  post () {
    this._http.post(this._msgApi, {
      'msg': this.text,
      'author': this.author,
      'room': this._roomName
    }).subscribe(
      res => {
      },
      err => {
      }
    );
  }



}
