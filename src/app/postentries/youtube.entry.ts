import { Component, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Post, PostImage, PostYoutube } from "app/rest/rest.service";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'youtubeentry',
  templateUrl: './youtube.entry.html',
  
})
export class YoutubeEntry {
  
  @Input() postYoutube: PostYoutube;
  
  constructor() {}

    
}