import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { Interceptor } from './interceptor';
import { ResInterceptor } from './res.interceptor';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:Interceptor, multi:true},
    {provide:HTTP_INTERCEPTORS, useClass:ResInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
