import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { RestService, Post, SearchResult, HashTag } from './rest/rest.service';
import {Config} from './config/config';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',

  providers: [Config,RestService],
})
export class SearchComponent  {
    //TODO: this needs to be defined as ngmodel, but i dont know how
    searchText : string = ""; //must be empty string, to allow template to filter for this condition 

    config : Config
    restSvc : RestService

    searchResultPosts : Array<Post> = [];
    searchResultHashTags : Array<HashTag> = [];
  
  constructor(private _config: Config, private _rest: RestService) {
    this.config = _config;
    this.restSvc = _rest;
  }

    searchChange(event) {
        console.log(event); 
        if(event != ""){
          this.restSvc.searchStuff(event).subscribe(searchResult => {
            this.searchResultPosts = searchResult.posts;
            this.searchResultHashTags = searchResult.hashTags;
          })
        }else{
          this.searchResultPosts   = [];
          this.searchResultHashTags   = [];
        }
        
        //check for input changes    
    }

    encodeTag(tag:string) {
      console.log(tag);
      console.log(tag.replace("#","%23"));
      return tag.replace("#","%23");
    }

}