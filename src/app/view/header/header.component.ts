import { AuthenticateService } from './../../service/authenticate.service';
import { DataSharingService } from './../../service/dataSharing.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
    loggedIn: boolean =false;
    uname: string ="";

    constructor(
        private router:Router,
        private dsc:DataSharingService,
        private authService: AuthenticateService,
    ){
        // console.log(this.dsc.uname.value)
        this.dsc.isLoggedIn.subscribe(value=>this.loggedIn=value);
        this.dsc.uname.subscribe(value=>{this.uname=value;});
    }

    ngOnInit(){
        this.isLoggedIn()
        console.log(this.loggedIn)
    }

    private isLoggedIn(){
        if(localStorage.getItem('token')){
            this.authService.isAdmin()
            .subscribe(
                (data)=>{
                    console.log(data);
                    if(String(data.role)=='admin')
                        this.dsc.userRole.next(data.role);
                    console.log(String(data.uname))
                    this.dsc.uname.next(data.uname);
                    // this.router.navigate(['home']);
                },
                (err)=>{
                    console.log(err);
                },
                ()=>this.dsc.isLoggedIn.next(true)
            )
        }
    }

    logout(){
        localStorage.removeItem('token');
        if(localStorage.getItem("token")) console.log("jdbv");
        this.router.navigate(['login'])
        this.dsc.isLoggedIn.next(false);
        this.dsc.uname.next("");
        this.dsc.userRole.next('member');
    }
}