import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable,map } from "rxjs";
import { User } from "./user.model";
import { UserInfo } from "./user-info.model";
import { UserProfile } from "./user-profile.model";
import { Apollo } from "apollo-angular";
import { CHANGE_USER_PASSWORD, GET_USER_PROFILE, SEND_FORGOT_PASSWORD_EMAIL, UPDATE_USER_PROFILE } from "../graphql/graphql.operation";

@Injectable({
    providedIn:'root'
})
export class UserService{

    private basePath:string = 'http://localhost:8080/api/users';

    private options:object = {};

    private users$:BehaviorSubject<UserInfo | null> = new BehaviorSubject<UserInfo | null>(null);

    constructor(private http:HttpClient,private apollo:Apollo){
        this.options = {
            headers:{
               // 'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMjA4MjgxNDA1NjMiLCJleHAiOjE2ODc2MTIzMDYsImlhdCI6MTY4NTg4NDMwNiwic2NvcGUiOiIifQ._3RgCXo4XMTwSACTW-ujhdLDBubP4sbj890wBFzyxWI'
            }
        };
    }


    findUsers(params?:object){
        this.http
            .get<UserInfo>(this.basePath,this.options)
            .subscribe(res=>this.users$.next(res));
        
        console.log("Hi");
    }

    findProfileByUsername(username:string,params?:object){
        //return this.http.get<UserProfile>(`${this.basePath}/${username}/profile`,this.options);
       return this.apollo.query({
            query:GET_USER_PROFILE,
            variables:{
                username:username
            }
        });
    }

    changePasswordByUsername(username:string,password:string){
        return this.apollo.mutate({
            mutation:CHANGE_USER_PASSWORD,
            variables:{
                username:username,
                password:password
            }
        });
    }

    updateProfileByUsername(username:string,data:object){
        console.log(data);
        return this.apollo.mutate({
            mutation:UPDATE_USER_PROFILE,
            variables:{
                username:username,
                userInput:data
            }
        })
    }

    sendForgotPasswordEmailByEmail(email:string){
        return this.apollo.mutate({
            mutation:SEND_FORGOT_PASSWORD_EMAIL,
            variables:{
                emailAddress:email,
            }
        })
    }

    

    findUsersByLink(link:string,params?:object):Observable<UserInfo>{
        return this.http.get<UserInfo>(link,this.options);
    }

    //getter and setter
    get getUsers$(){ return this.users$;}
}