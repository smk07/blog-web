import { loginURL, signupURL, verifiedURL, host } from './URLConstants';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthenticateService{
    constructor(private http:HttpClient){}

    saveToken(token:string){
        localStorage.setItem('token',token);
    }

    getAccessToken(){
        return localStorage.getItem('token');
    }

    login(userForm:any){
        // console.log(userForm)
        return this.http.post<any>(loginURL,{
            "loginId": userForm.value.loginId,
            "password": userForm.value.password
        });
    }

    signup(userForm:any){
        // console.log(userForm)
        return this.http.post<any>(signupURL,{
            "uname": userForm.value.uname,
            "email": userForm.value.email,
            "fname": userForm.value.fname, 
            "lname":userForm.value.lname,
            "password": userForm.value.password
        });
    }

    isVerified(){
        return this.http.get<Promise<{data:boolean,message:string}>>(verifiedURL,{});
    }

    forgotPassword(forgotForm:any){
        return this.http.post<any>(host+'/forgot',{
            "loginId": forgotForm.value.loginId
        })
    }

    resetPassword(resetForm:any,token:any){
        return this.http.post<any>(host+`/reset/?token=${token}`,{
            "password": resetForm.value.password
        })
    }

    resendVerification(){
        return this.http.post<any>(host+'/verify/new',{});
    }

    isAdmin(){
        return this.http.get<any>(host+"/isAdmin",{});
    }

    getProfile(uname:any){
        console.log(`${host}/${uname}`);
        return this.http.get<any>(`${host}/${uname}`,{});
    }

    getNotifications(){
        return this.http.get<any>(`${host}/notifications`,{})
    }

    updateNotification(id:any){
        return this.http.put<any>(`${host}/notifications/${id}`,{});
    }

    subscribe(uname:any){
        return this.http.post<any>(`${host}/${uname}/subscribe`,{});
    }

    unSubscribe(uname:any){
        return this.http.post<any>(`${host}/${uname}/unsubscribe`,{});
    }
}