import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "./auth/auth.service";
import { Router } from "@angular/router";

@Injectable()
export class LoginInterceptor implements HttpInterceptor{

    constructor(private authService:AuthService,private router:Router){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       

        return next.handle(req);
    }

}