import { Component, OnInit } from '@angular/core';
import {Config} from './config/config';
import {RestService,Post} from './rest/rest.service';


declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'imagesstream',
  templateUrl: './imagesstream.component.html',
  providers: [Config,RestService]
})
export class ImagesstreamComponent {
  vario: String;

  title = 'app works!'
  config : Config
  restSvc : RestService
  offset = 0
  posts : Array<Post> = new Array<Post>()
  
  constructor(private _config: Config, private _rest: RestService) {
    this.config = _config;
    this.restSvc = _rest;
    this.loadPosts()
  }


  /**
   * add new posts to view
   */
  loadPosts() {

    this.restSvc.getPosts(this.offset,this.config.config().behavior.infscrollstep)
      .subscribe(a  =>{ 
        for (let post of a) {
          console.log(post)
          this.posts.push(post)
          console.log("added new post")
        }
        
        
      })
      
    this.offset += this.config.config().behavior.infscrollstep
  }


onScroll() {
  console.log("scrolling down?!")
  this.loadPosts()
  
}

  

  
}
