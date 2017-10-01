import { Component, Input, AfterViewInit } from '@angular/core';
import { Post, PostMap } from "app/rest/rest.service";
import {Http} from '@angular/http';

declare let L: any;
@Component({
  selector: 'mapentry',
  templateUrl: './map.entry.html',
  
})
export class MapEntry  implements AfterViewInit{

  uniqueID  = this.guidGenerator();

   guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
  }

  constructor(private http: Http) {
    
}

  
  ngAfterViewInit(): void {
    console.log("MAPP");

    var mymap = L.map(this.uniqueID).setView([51.505, -0.09], 13);
    
    L.tileLayer('http://a.tile.openstreetmap.org/{id}/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: '',
  }).addTo(mymap);


   this.http.get("/postassets/" + this.postMap.geofile)
  .map(res => {
    console.log(res.json());
    var layer = L.geoJSON(res.json()).addTo(mymap);
    console.log(layer.getBounds());
    mymap.fitBounds(layer.getBounds());
    mymap.setMaxBounds(layer.getBounds());
  }).subscribe(f => f);

  }
  @Input() postMap: PostMap;
    
}