import { Component, OnInit } from '@angular/core';
import {Config} from './config/config';
import {RestService,Post} from './rest/rest.service';




declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [Config,RestService]
})
export class AppComponent{
  

  
}
