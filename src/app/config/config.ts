import { Injectable } from '@angular/core';

@Injectable()
 export class Config {
    config() {
        return {
            rest : {
                posts : {
                    slice : {
                        slice  : "/v1/posts/slice/",
                        bytag  : "/v1/posts/by-tag/",
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
                    }
                },                
                hashTags : {
                    find : "/v1/hashtags/find/",
                },

                find : "/v1/find/",
            },
            behavior : {
                infscrollstep : 5,
            }
        }
    }
 }