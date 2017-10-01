import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Config } from "app/config/config";
import { RestService, Post, PostImages } from "app/rest/rest.service";
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'image-rows',
  templateUrl: './imagerows.component.html',
})
export class ImageRowsComponent implements OnInit{
  offset = 0
  posts = Array<Post>() 
  filterStr : string = "";
  searchStr : string = "";
  
  constructor(private router: Router,
            private route: ActivatedRoute, 
            private config: Config, 
            private restSvc: RestService) {}

  ngOnInit() {
    console.log("router params")
    let _mthis = this;
    // Capture the token  if available
    this.route.params.subscribe(f => {
      this.filterStr = f['filtertype'];
      console.log(this.filterStr)
      this.searchStr = f['filterstring'];
      console.log(this.searchStr)
      this.loadPosts();
    })
    
  }

 
  /**
   * add new posts to view
   */
  loadPosts() {
    let  postsFut : Observable<Array<Post>>;
    switch(this.filterStr) {
      case "tags":
      postsFut = this.restSvc.getPostsByTag(this.searchStr,this.offset,this.config.config().behavior.infscrollstep)
      break;
      case "location" :
      postsFut = this.restSvc.getPostsByLocation(this.searchStr,this.offset,this.config.config().behavior.infscrollstep)
      break;
      case "my-likes":
      postsFut = this.restSvc.getPostsByMyLikes(this.offset,this.config.config().behavior.infscrollstep)
      break;
      case "all":
      postsFut = this.restSvc.getPosts(this.offset,this.config.config().behavior.infscrollstep)
      break;
      default:
      postsFut = this.restSvc.getPosts(this.offset,this.config.config().behavior.infscrollstep)
    }


    postsFut.subscribe(a  =>{ 
      for (let post of a) {
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