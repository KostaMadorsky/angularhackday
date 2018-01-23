import { Injectable } from '@angular/core';
import { HubConnection } from '@aspnet/signalr-client';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

export class HubMessage {
  text: string;
  author: HubUser;
  dateSent: Date;
}

export class HubUser {
  id: string;
  name: string;
  room: string;
}

export enum ConnectionState {
  Connecting = 1,
  Connected = 2,
  Reconnecting = 3,
  Disconnected = 4,
  Unknown = -1
}

declare const $: any;

@Injectable()
export class ChatHostService {
  private _hub = environment.chatHub.hub;
  private _msgApi = environment.chatHub.msgApi;
  private _msgEventName = environment.chatHub.msgEventName;
  private _joinMethodName = environment.chatHub.joinMethodName;
  private _leaveMethodName = environment.chatHub.leaveMethodName;
  private _hubConnection: HubConnection;
  private _connectionId: string;
  private _connectionState: number;
  private _isInit = false;
  private _isStarted = false;
  private _isJoined = false;
  private _joinedRoom: string;
  private _userName: string;

  get isStarted() { return this._isStarted; }
  get isJoined() { return this._isJoined; }
  get joinedRoom() { return this._joinedRoom; }
  get connectionId() { return this._connectionId; }
  get connectionState() { return this._connectionState; }

  private messageReceivedSubject = new Subject<HubMessage>();
  messageReceivedEvent$: Observable<HubMessage>;

  constructor(private _http: HttpClient) {
    this.messageReceivedEvent$ = this.messageReceivedSubject.asObservable();
    this.init();
  }

  init() {
    this._hubConnection = new HubConnection(this._hub);

    this._hubConnection.onclose(err => {
      this._isInit = false;
      this._isStarted = false;
    });

    this._hubConnection.on(this._msgEventName, (msg: HubMessage) => {
      this.messageReceivedSubject.next(msg);
      console.log('Msg received:', msg);
    });

    this._isInit = true;
  }

  start() {
    if (this._isStarted) {
      return false;
    }

    this._hubConnection.start()
      .then((data: any) => {
        this._isStarted = true;
        console.log('Hub connection started', this._hubConnection);
        // this._connectionId = this._hubConnection.connection.connectionId;
        // this._connectionState = this._hubConnection.connection.connectionState;
      }, (err) => {
        console.error('Could not connect to hub', err);
      });
  }

  stop() {
    this._hubConnection.stop();
    this._isStarted = false;
  }

  postOverApi (msg: HubMessage) {
    if (this._joinedRoom !== msg.author.room) {
      throw Error('You are joined to another room: ' + this._joinedRoom);
    }
    this._http.post(this._msgApi, {
      'text': msg.text,
      'author': msg.author,
      'room': msg.author.room,
      'dateSent': msg.dateSent
    }).subscribe(
      res => {
      },
      err => {
      }
    );
  }

  post2 (text: string) {
    // if (this._joinedRoom !== msg.author.room) {
    //   throw Error('You are joined to another room: ' + this._joinedRoom);
    // }
    let msg = new HubMessage();
    msg.author = new HubUser();
    msg.author.room = this._joinedRoom;
    msg.author.name = this._userName;
    msg.text = text;
    msg.dateSent = new Date();

    this._hubConnection.invoke('SendMessage', msg);
  }


  joinRoom(room: string, user: string) {
    if (this._isJoined) {
      this.leaveRoom();
    }

    this._hubConnection.invoke(this._joinMethodName, room)
      .then((data: any) => {
        console.log('Joined room: ' + room, data);
        this._isJoined = true;
        this._joinedRoom = room;
        this._userName = user;
      });
  }

  leaveRoom() {
    if (this._isJoined) {
      this._hubConnection.invoke(this._leaveMethodName, this._joinedRoom)
        .then((data: any) => {
          console.log('Left room: ' + this._joinedRoom, data);
          this._isJoined = false;
          this._joinedRoom = '';
        });
    }
  }

}
