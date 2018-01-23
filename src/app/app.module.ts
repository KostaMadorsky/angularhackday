import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ChatHostComponent } from './components/chat-host/chat-host.component';
import { ChatHostService } from './services/chat-host.service';
import { TestComponent } from './components/test/test.component';
import { HubMessageComponent } from './components/hub-message/hub-message.component';


@NgModule({
  declarations: [
    AppComponent,
    ChatHostComponent,
    TestComponent,
    HubMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ChatHostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
