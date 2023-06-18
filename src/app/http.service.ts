import { HttpClient } from "@angular/common/http";
import {Injectable} from "@angular/core";
import { Observable,throwError,catchError} from "rxjs";

@Injectable(
    {providedIn:"root"}
)
export class HttpService{

    private apiUrl = "http://localhost:8080/api/hi";

    constructor(private http:HttpClient){}

    public getAll():Observable<any>{
        return this.http.get(this.apiUrl,{observe:'response',responseType:'text',withCredentials:true,headers:{
            "Authorization":`Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMjA4MjgxNDA1NjMiLCJleHAiOjE2ODQ5Mzg4NTUsInNjb3BlIjoiIn0.qv0rB-m9voPkfX29PVoDqJ5I86_gVnvAvRBmfVrTcfU` ,
        }});
    }

    public save(){
        
    }
}