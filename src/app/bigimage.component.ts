import { Component, Input } from '@angular/core';
import { Post, PostContent, PostDate, RestService } from "./rest/rest.service";
import { OnChanges, SimpleChanges, OnInit } from '@angular/core';


@Component({
  selector: '[bigimage]',
  templateUrl: './bigimage.component.html',
  
})
export class BigImageComponent implements OnChanges{
  likesCount : number = 0;
  iLikePost = false;

  constructor(private rest: RestService) {

  }


  ngOnChanges(changes: SimpleChanges) {
    if(changes.post && changes.post.currentValue){
      var post: Post = changes.post.currentValue
      this.rest.setUserAutoLikePost(post.slug);
      this.rest.getLikeCount(post.slug).subscribe(count => this.likesCount = count);
      this.rest.getUserLikesPost(post.slug).subscribe(ilike => this.iLikePost = ilike);
    }
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



    @Input() post : Post
 

 
}