import { Component, OnInit } from '@angular/core';
import { HubMessage } from '../../services/chat-host.service';
import { Input } from '@angular/core';

@Component({
  selector: 'hub-message',
  templateUrl: './hub-message.component.html',
  styleUrls: ['./hub-message.component.css']
})
export class HubMessageComponent implements OnInit {
  @Input() message: HubMessage;
  @Input() isMine = false;;

  constructor() { }

  ngOnInit() {
  }

}
