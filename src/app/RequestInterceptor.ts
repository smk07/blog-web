import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {timeout} from 'rxjs/operators';

@Injectable()
export class RequestInterceptor implements HttpInterceptor{
    constructor(public router:Router){}

    intercept(
        req:HttpRequest<any>,
        next:HttpHandler
    ):Observable<HttpEvent<any>> {
        
        let token = localStorage.getItem('token');

        if(token && req.url.indexOf('token')<0){
            req = req.clone({
               headers: req.headers.set("Authorization",`Bearer ${token}`)
            });
        }
        return next
            .handle(req)
            .pipe(timeout(6000))
            .pipe();
    }
}