import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable,map } from "rxjs";
import { User } from "./user.model";
import { UserInfo } from "./user-info.model";

@Injectable({
    providedIn:'root'
})
export class UserHttpService{

    private basePath:string = 'http://localhost:8080/api/users';

    private options:object = {};

    private users$:BehaviorSubject<UserInfo | null> = new BehaviorSubject<UserInfo | null>(null);

    constructor(private http:HttpClient){
        this.options = {
            headers:{
                'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMjA4MjgxNDA1NjMiLCJleHAiOjE2ODc2MTIzMDYsImlhdCI6MTY4NTg4NDMwNiwic2NvcGUiOiIifQ._3RgCXo4XMTwSACTW-ujhdLDBubP4sbj890wBFzyxWI'
            }
        };
    }

    findUsers(params?:object){
        this.http
            .get<UserInfo>(this.basePath,this.options)
            .subscribe(res=>this.users$.next(res));
        
        console.log("Hi");
    }

    findUsersByLink(link:string,params?:object):Observable<UserInfo>{
        return this.http.get<UserInfo>(link,this.options);
    }

    //getter and setter
    get getUsers$(){ return this.users$;}
}