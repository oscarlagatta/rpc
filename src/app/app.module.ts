import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { RpcExecutionModule } from './rpc-execution/rpc-execution.module';
  

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    RpcExecutionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
