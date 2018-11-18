import { Component } from '@angular/core';
import {DataService} from './data.service'
import {HttpEvent, HttpEventType} from '@angular/common/http'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {


  constructor(private dataService:DataService){
  
  }
  data:any
  headers:any
  keys:any
  values:any
  text:string
  sent:boolean
  event:any
  dataParams:any
  loading:any
  interceptorLog:string


  loadData(){
    this.dataService.getData()
  .subscribe( data => {
    this.data = data;
  })
  }

  loadHeaders(){
    this.dataService.getAllData()
    .subscribe(resp => {
      this.values = resp.headers.keys();
      this.keys = resp.headers.keys();
      this.headers = this.keys.map(key =>
        `${key}: ${resp.headers.get(key)}   `);
    });
  } 

  loadTextFile(){
    this.dataService.getTextFile('assets/tekstfile.txt').subscribe(data => {
      this.text = data
    })
  }

  getEvents(){
    this.dataService.getEvent()
    .subscribe((response:HttpEvent<Object>) => {
      this.event = response;      
      if(response.type === HttpEventType.Sent){
        this.sent = true
      }
    })
  }


  getParams(){
    this.dataService.getParams()
    .subscribe(response => this.dataParams = response )
  }



  progress(){
    this.dataService.progress()
    .subscribe( response => {     
      if(response.type === HttpEventType.DownloadProgress){
        this.loading = Math.round((response.loaded/1024) * 100) / 100
      }
    })

  }
  interceptor(){
    this.dataService.getData().subscribe()
    this.interceptorLog = "View result in Console"
  }

}
