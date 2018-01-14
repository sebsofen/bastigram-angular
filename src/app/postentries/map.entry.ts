import { Component, Input, AfterViewInit } from '@angular/core';
import { Post, PostMap, PostContent, PostMapList } from "app/rest/rest.service";
import {Http} from '@angular/http';
import { MarkdownService } from "angular2-markdown";

declare let L: any;
@Component({
  selector: '[mapentry]',
  templateUrl: './map.entry.html',
  
})
export class MapEntry  implements AfterViewInit {

  uniqueID  = this.guidGenerator();

   guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
  }

  constructor(private http: Http, private _markdown: MarkdownService) {
    console.log("MAP ENTRY");
  }

  
  ngAfterViewInit(): void {
    console.log("MAPP");

    var mymap = L.map(this.uniqueID).setView([51.505, -0.09], 13);
    
    L.tileLayer('http://a.tile.openstreetmap.org/{id}/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: '',
  }).addTo(mymap);

    switch(this.postMap.type) {
      case "MAP":
      console.log(this.postMap);
        this.addpostMapToMap(this.postMap as PostMap,mymap);
      break;
      
      case "MAPLIST":
        console.log("MAPLIST");
        var postMapList = this.postMap as PostMapList
        postMapList.postMapList.forEach(postMap => this.addpostMapToMap(postMap,mymap));

      break;
    }

   

  }

  addpostMapToMap(postmap : PostMap, mymap: any) : void {
    console.log(postmap);
    if(postmap.geofile !== undefined){
      this.http.get("/postassets/" + postmap.geofile)
      .map(res => {
        console.log(res.json());
        var layer = L.geoJSON(res.json()).addTo(mymap);
        console.log(layer.getBounds());
        mymap.fitBounds(layer.getBounds());
        mymap.setMaxBounds(layer.getBounds());
      }).subscribe(f => f);
    }

    if(postmap.latLon !== undefined){
      if(postmap.latLon !== undefined) {
        if(postmap.markerType === undefined || this.icons[postmap.markerType] === undefined) {
          L.marker([postmap.latLon.lat, postmap.latLon.lon]).addTo(mymap);
        } else {
          L.marker([postmap.latLon.lat, postmap.latLon.lon], {icon: this.icons[postmap.markerType] }).addTo(mymap);
        }
      }
    }

    if(postmap.fromTo !== undefined) {


      var latlng1 = [postmap.fromTo[0].lat,postmap.fromTo[0].lon],
      latlng2 = [postmap.fromTo[1].lat,postmap.fromTo[1].lon];
      
      var offsetX = latlng2[1] - latlng1[1],
      offsetY = latlng2[0] - latlng1[0];
      
      var r = Math.sqrt( Math.pow(offsetX, 2) + Math.pow(offsetY, 2) ),
      theta = Math.atan2(offsetY, offsetX);
      
      var thetaOffset = (3.14/10);
      
      var r2 = (r/2)/(Math.cos(thetaOffset)),
      theta2 = theta + thetaOffset;
      
      var midpointX = (r2 * Math.cos(theta2)) + latlng1[1],
      midpointY = (r2 * Math.sin(theta2)) + latlng1[0];
      
      var midpointLatLng = [midpointY, midpointX];

      var curvedPath = L.curve(
        [
          'M', latlng1,
          'Q', midpointLatLng,
             latlng2
      ], {
        color: 'red',
        weight: 3,
        opacity: 0.5,
        smoothFactor: 1
      }).addTo(mymap);
      if(postmap.label !== undefined) {
        
        curvedPath.bindTooltip(this._markdown.compile(postmap.label)).openTooltip();
      }
      L.marker(latlng1, {icon: this.icons["from"] }).addTo(mymap);
      L.marker(latlng2, {icon: this.icons["to"] }).addTo(mymap);
    }
  
  }

  @Input() postMap: PostContent;

  icons = {
    "park" : L.icon({
      iconUrl: '/assets/img/icons/park.svg',
      iconSize:     [32, 32], // size of the icon
      iconAnchor:   [16, 16], // point of the icon which will correspond to marker's location
    }),
    "to" : L.icon({
      iconUrl: '/assets/img/icons/to.svg',
      iconSize:     [16, 16], // size of the icon
      iconAnchor:   [8, 8], // point of the icon which will correspond to marker's location
    }),
    "from" : L.icon({
      iconUrl: '/assets/img/icons/from.svg',
      iconSize:     [16, 16], // size of the icon
      iconAnchor:   [8, 8], // point of the icon which will correspond to marker's location
    })
  }
    
}