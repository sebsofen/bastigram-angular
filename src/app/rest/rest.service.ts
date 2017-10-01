import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Config} from '../config/config';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class RestService { //TODO: is config injectable at this point?
    constructor(private http: Http, private config: Config) {
        
    }

    getHashTags(search: string){
        return this.http.get(this.config.config().rest.hashTags.find + search)
            .map(res => <HashTag>res.json());
            
    }

    getPostsByLocation(locationName:string, offset: Number = 0, limit: Number = 10) : Observable<Array<Post>> {
        return this.http.get(this.config.config().rest.posts.slice.slice + offset + "/" + limit + "/by-location/" + locationName)
        .map(response =>{
            console.log(response)
            return  response.json().map(jPost =>new Post(jPost));
        })
    }

    getPostsByTag(tag:string, offset: Number = 0, limit: Number = 10) : Observable<Array<Post>> {
        
        tag = tag.replace("#","%23");
        return this.http.get(this.config.config().rest.posts.slice.slice + offset + "/" + limit + "/by-tag/" + tag)
        .map(response =>{
            console.log("GETPOSTS)")
            console.log(response)
            return  response.json().map(jPost =>new Post(jPost));
        })
    }

    getPostsByMyLikes(offset: number = 0, limit: number = 15) : Observable<Array<Post>> {
        return this.http.get(this.config.config().rest.likes.posts.mylikes(offset,limit))
        .map(response =>{
            console.log(response)
            return  response.json().map(jPost =>new Post(jPost));
        })
    }

    getPosts(offset: Number = 0, limit: Number = 10) : Observable<Array<Post>> {
        return this.http.get(this.config.config().rest.posts.slice.slice + offset + "/" + limit + "/by-date" )
        .map(response =>{
            return  response.json().map(jPost =>new Post(jPost));
        })
    }

    getAllLocations() : Observable<Array<PostMap>> {
        return this.http.get(this.config.config().rest.locations.all )
        .map(response => {
            return response.json().map(jMap => new PostMap(jMap));
        });
    }

    getPost(slug:string) : Observable<Post> {
        console.log("getting "+ this.config.config().rest.posts.single + slug);
        return this.http.get(this.config.config().rest.posts.single + slug).map(f => {
            return new Post(f.json())            
        }                 )
        .catch(f => {
             console.log("caught")
             return Observable.throw(new Error("404")) })
    }

    searchStuff(searchString: string) : Observable<SearchResult> {
        return this.http.get(this.config.config().rest.find + searchString)
        .map(response => { 
            console.log("SEARCHSTRINGRESPONSE");
            console.log(response);
            return  new SearchResult(response.json())});
        
        
        
        
    }

    getLikeCount(postSlug: string) : Observable<number> {
        return this.http.get(this.config.config().rest.likes.count.slug + postSlug)
        .map(response => parseInt(response.text()))
    }
    getUserLikesPost(postSlug: string) : Observable<boolean> {
        return this.http.get(this.config.config().rest.likes.user.doilike + postSlug)
        .map(response => {
            console.log("user likes " + postSlug + " " + response.text() )
            if(response.text() == "no") {
                return false;
            }else{
                return true;
            }
        }) 
    }
    setUserAutoLikePost(postSlug: string) {
        this.http.get(this.config.config().rest.likes.user.iautolike + postSlug).subscribe(f => f)
    }
    
    setUserDisLikePost(postSlug: string) {
        this.http.get(this.config.config().rest.likes.user.idislike + postSlug).subscribe(f => f)
    }
    
    setUserLikePost(postSlug: string) {
        this.http.get(this.config.config().rest.likes.user.ilike + postSlug).subscribe(f => f)
    }
    
}

export interface HashTag {
    tag: string;
}



class Location {
    location: string
    constructor(jLocation:any) {
        this.location = jLocation.location
    }
}

class Image {
    path: string
    constructor(jImage:any) {
        this.path = jImage.path
    }
}
 
export class Post {
    hashTags : Array<HashTag>
    slug: string 
    images: Array<Image>
    likes: Number
    memory : Map<string,PostContent> 

    constructor(jPost: any) {
        this.slug = jPost.slug
        this.memory = new PostMemory(jPost.memory).memory
        



    }

    displayVars() : Array<PostContent>  {
        var lists = this.memory.get("display") as PostList        
        return lists.list.map(item => this.memory.get(item));
      }
    
    displayImages() : Array<PostImages> {
        return <Array<PostImages>> this.displayVars().filter(pC => pC.type == "IMGS")
    }

    public location() : string {
        try {
            var location = this.memory.get("location") as PostMap
            if(location == undefined) {
                return ".";
            }else{
                return location.name;
            }
            

        }catch(e) {
            return ".";
        }
    }
    public body() : string{
        try {
            var body = this.memory.get("postBody") as PostBody
            var bodyStr = body.body;
            const regex = /\#([^ ]+)/g;
            let m;
            
            while ((m = regex.exec(body.body)) !== null) {
                // This is necessary to avoid infinite loops with zero-width matches
                if (m.index === regex.lastIndex) {
                    regex.lastIndex++;
                }
                
                // The result can be accessed through the `m`-variable.
                m.forEach((match, groupIndex) => {
                    var tagname = match.replace("#","")
                    bodyStr = bodyStr.replace(match,"[" + match + "](/row/tags/%23" + tagname + ")")
                });
            }


            return bodyStr;
        }catch (e){
            return "";
        }
    }

    public created() : number {
        try {
            var created = <PostDate>this.memory.get('created')
            return created.date;
          }catch(e){
            return -1;
          }
    }

    public taken() : number {
        try {
            var taken = <PostDate>this.memory.get('taken')
            return taken.date;
          }catch(e){
            return -1;
          }
    }


}

export class PostMemory {
    memory : Map<string,PostContent> = new Map();
    constructor(jMemoryMap: any) {
        console.log(jMemoryMap);
        var variables : Array<string> = Object.getOwnPropertyNames(jMemoryMap);
        variables.forEach(element => {
            var value = jMemoryMap[element];
            switch(value.type) {
                case "BODY":
                console.log(value.cnt);
                this.memory.set(element, new PostBody(value.cnt));
                break;
                case "IMGS": 
                this.memory.set(element, new PostImages(value.cnt));
                break;
                case "LIST":
                this.memory.set(element, new PostList(value.cnt));
                break;
                case "DATE":
                this.memory.set(element, new PostDate(value.cnt));
                break;
                case "MAP":
                this.memory.set(element, new PostMap(value.cnt));
                break;
                //TODO: add more
                default:
                console.error("type " + value.type + " unknown")
            }
            
        });

        
        
    }
}

export abstract class PostContent {
    type: string = "UNKNOWN";

}

export class PostMap extends PostContent {
    type = "MAP"
    geofile : Array<string>
    name : string
    latLon : LatLon
    constructor(jMap: any) {
        super();
        this.geofile = jMap.geofile;
        this.name = jMap.name;
        this.latLon = jMap.latLon;
    }
}

export class LatLon  {
    lat: number
    lon: number
}

export class PostImages extends PostContent {
    type = "IMGS"
    images : Array<string>
    constructor(jImages: any) {
        super();
        this.images = jImages.imgs;
    }
}

export class PostDate extends PostContent {
    type = "DATE"
    date: number
    constructor(jDate: any) {
        super();
        this.date = jDate.timestamp
    }


}

class PostList extends PostContent {
    type = "LIST"
    list : Array<string>
    constructor(jList: any) {
        super();
        this.list = jList.list;
    }
}

class PostBody extends PostContent{
    type = "BODY"
    body: string
    constructor(jBody: any) {
        super();
        this.body = jBody.body
    }
}



export class SearchResult {
    hashTags: Array<HashTag>
    posts: Array<Post>
    constructor(jResults: any) {
        console.log(jResults);
        this.hashTags = jResults.hashTags.map(tag => <HashTag> tag);
        this.posts = jResults.posts.map(post => new Post(post))

    }
}