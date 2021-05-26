import { DataSharingService } from './../../service/dataSharing.service';
import { Router } from '@angular/router';
import { AuthenticateService } from './../../service/authenticate.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';


@Component({
    selector:'app-login',
    templateUrl:'./login.component.html',
    styleUrls:['./login.component.css']
})
export class LoginComponent implements OnInit{
    userForm:any;
    invalidCred: boolean=false;

    constructor(
        private authService:AuthenticateService,
        private fb :FormBuilder,
        private router: Router,
        private dsc: DataSharingService
    ){
        this.userForm = this.fb.group({
            loginId: new FormControl("",[Validators.required]),
            password: new FormControl("",[Validators.required])
        });
    }

    ngOnInit(){
        if(localStorage.getItem('token')){
            this.authService.isAdmin()
            .subscribe(
                (data)=>{
                    console.log(data);
                    if(String(data.role)=='admin')
                        this.dsc.userRole.next(String(data.role));
                    this.dsc.uname.next(String(data.uname));
                    this.router.navigate(['home']);
                },
                (err)=>{
                    console.log(err);
                }
            )
        }
    }

    login(){
        console.log("Inside login")
        if(this.userForm.valid)
            this.authService.login(this.userForm)
            .subscribe((data)=>{
                console.log(data);
                localStorage.setItem('token',data.token);
                this.dsc.isLoggedIn.next(true)
                if(String(data.role)=='admin')
                    this.dsc.userRole.next(String(data.role));
                this.dsc.uname.next(String(data.uname));
                this.router.navigate(['home']);
            },(err)=>{
                this.invalidCred = true;
            });
    }
}