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

    getPostsByTag(tag:string, offset: Number = 0, limit: Number = 10) : Observable<Array<Post>> {
        
        tag = tag.replace("#","%23");
        console.log(this.config.config().rest.posts.slice.bytag + tag + "/" + offset + "/" + limit);
        return this.http.get(this.config.config().rest.posts.slice.bytag + tag + "/" + offset + "/" + limit)
        .map(response =>{
            console.log("GETPOSTS)")
            console.log(response)
            return  response.json().map(jPost =>new Post(jPost));
        })
    }

    getPosts(offset: Number = 0, limit: Number = 10) : Observable<Array<Post>> {
        return this.http.get(this.config.config().rest.posts.slice.slice + offset + "/" + limit + "/by-date" )
        .map(response =>{
            console.log("GETPOSTS)")
            console.log(response)
            return  response.json().map(jPost =>new Post(jPost));
        })
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
    location: Location
    hashTags : Array<HashTag>
    slug: string
    created: Number
    images: Array<Image>
    likes: Number
    memory : Map<string,PostContent> 

    constructor(jPost: any) {
        this.slug = jPost.slug
        this.memory = new PostMemory(jPost.memory).memory
        



    }

    public body() : string{
        try {
            var body = this.memory.get("postBody") as PostBody
            return body.body;
        }catch (e){
            return "";
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

    public toDateString() : string {
        var d = new Date(this.date);
        return d.getDay() + "." + d.getMonth() + "." + d.getFullYear();
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