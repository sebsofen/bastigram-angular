import { Component, Input } from '@angular/core';
import { Post, PostContent, PostDate, RestService } from "./rest/rest.service";
import { OnChanges, SimpleChanges, OnInit, ViewChild } from '@angular/core';
import { GlidejsDirective } from "app/shared/glidejs.directive";


@Component({
  selector: '[bigimage]',
  templateUrl: './bigimage.component.html',
  
})
export class BigImageComponent implements OnChanges{
  likesCount : number = 0;
  iLikePost = false;

  constructor(private rest: RestService) {

  }
  @ViewChild(GlidejsDirective)
  private child: GlidejsDirective;
  


  ngOnChanges(changes: SimpleChanges) {
    if(changes.post && changes.post.currentValue){
      var post: Post = changes.post.currentValue
      this.rest.setUserAutoLikePost(post.slug);
      this.rest.getLikeCount(post.slug).subscribe(count => this.likesCount = count);
      this.rest.getUserLikesPost(post.slug).subscribe(ilike => this.iLikePost = ilike);
    }
  }

  imageLoadedEventCallback() {
    console.log("image loaded compoenent in bigimage");

    this.child.update();
  }

  setLike() {
    this.rest.setUserLikePost(this.post.slug)
    this.likesCount++;
    this.iLikePost = true;
  }

  setDisLike() {
    this.rest.setUserDisLikePost(this.post.slug)
    this.likesCount--;
    this.iLikePost = false;
  }

  entryAfterViewInit() {
    console.log("AFTER ENTITY VIEW INIT");
  }

    @Input() post : Post

    

 
}