import { Component, OnInit } from '@angular/core';
import { HubConnection } from '@aspnet/signalr-client';
import { ChatHostService, HubMessage } from '../../services/chat-host.service';

@Component({
  selector: 'hd-chat-host',
  templateUrl: './chat-host.component.html',
  styleUrls: ['./chat-host.component.css']
})

export class ChatHostComponent implements OnInit {
  private _isJoined = false;
  messages: HubMessage[];
  author: string;
  room = 'team1';

  get isJoined() { return this._isJoined; }

  constructor(private _hubService: ChatHostService) {
    this.messages = [];
    this.author = 'konst';
  }

  ngOnInit() {
    this._hubService.start();

    this._hubService.messageReceivedEvent$
      .subscribe((msg: HubMessage) => {
        this.messages.splice(0, 0, msg);
      });
  }

  toggleConnection() {
    if (this._isJoined) {
      this._hubService.leaveRoom();
      this.messages = [];
    } else {
      this._hubService.joinRoom(this.room, this.author);
    }

    this._isJoined = !this._isJoined;
  }

  post(input: HTMLInputElement) {
    this._hubService.post2(input.value);
    input.value = '';
  }




}
