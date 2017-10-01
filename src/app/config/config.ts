import { Injectable } from '@angular/core';

@Injectable()
 export class Config {
    config() {
        return {
            rest : {
                posts : {
                    slice : {
                        slice  : "/v1/posts/slice/"
                    },
                    single : "/v1/posts/by-slug/"
                },

                likes : {
                    count : {
                        slug : "/v1/likes/by-slug/"
                    },
                    user : {
                        ilike : "/v1/likes/ilike/",
                        idislike : "/v1/likes/idislike/",
                        doilike :  "/v1/likes/doilike/",
                        iautolike :"/v1/likes/iautolike/",
                    },
                    posts : {
                        mylikes : function(offset: number, limit: number) {return "/v1/likes/slice/" + offset + "/" + limit + "/my-likes"; }
                    }
                },                
                hashTags : {
                    find : "/v1/hashtags/find/",
                },
                locations : {
                    all : "/v1/locations/all"
                },

                find : "/v1/find/",
            },
            behavior : {
                infscrollstep : 15,
            }
        }
    }
 }