import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "../user/user.model";
import { UserCredentials } from "../user/user-credentials.model";
import { Apollo, MutationResult } from "apollo-angular";
import { AUTH_LOGIN } from "../graphql/graphql.operation";

@Injectable
    ({ providedIn: 'root' })
export class AuthService {

    private path = `${environment.API_URL}/api/auth`

    constructor(private httpClient: HttpClient,private apollo:Apollo) { }

    public login(data: User): Observable<MutationResult<any>> {
        //return this.httpClient.post<UserCredentials>(`${this.path}/login`, data);
        return this.apollo.mutate<any>({
            mutation:AUTH_LOGIN,
            variables:{
                input:data
            }
        });
    }

    public saveToken(credentials: UserCredentials) {
        sessionStorage.setItem('credentials', JSON.stringify({
            username: credentials['username'],
            refreshToken: credentials['refreshToken'], 
            accessToken: credentials['accessToken']
        }));
    }

    public isLoggedIn():boolean{
        return sessionStorage.getItem('credentials') ? true : false;
    }

    public getUsername(){
        const credentials = JSON.parse(sessionStorage.getItem('credentials') as string);
        return credentials['username'];
    }
}