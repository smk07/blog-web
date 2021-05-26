import { DataSharingService } from './../../service/dataSharing.service';
import { AuthenticateService } from './../../service/authenticate.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { mustMatch } from 'src/app/validators/customValidators';


@Component({
    selector:'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
    userForm:any;
    isValidUname: boolean = true
    isValidPassword:boolean = true
    isEqualPassword: boolean = true

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

    constructor(
        private router: Router ,
        private fb: FormBuilder,
        private authService:AuthenticateService,
        private dsc: DataSharingService,
    ){
        this.userForm = this.fb.group({
            uname: new FormControl("",[Validators.required]),
            email: new FormControl("",[Validators.required]),
            password: new FormControl("",[Validators.required]),
            rePassword: new FormControl("",[Validators.required]),
            fname: new FormControl("",[Validators.required]),
            lname: new FormControl("",[Validators.required])
        },{
            validator: mustMatch('password','rePassword')
        });
    }

    signUp(){
        if(this.userForm.valid)
            this.authService.signup(this.userForm)
                .subscribe(
                    (data)=>{
                        console.log(data)
                        localStorage.setItem('token',data.token);
                        alert(data.message)
                        this.dsc.isLoggedIn.next(true);
                        this.dsc.uname.next(String(data.uname));
                        this.router.navigate(['home'])
                    },
                    (err)=>{
                        console.log(err);
                        // console.log(err.error.message=="Username already exists!");
                        if(String(err.error.message)=="Username already exists!"){
                            this.userForm.controls['uname'].setErrors({'isExists':"Username already exists"});
                            this.userForm.setErrors({'invalid':true})
                            return;
                        }
                        else this.userForm.controls['uname'].setErrors(null);
                        if(String(err.error.message)=="Account already exists for this email!"){
                            console.log("inside")
                            this.userForm.controls['email'].setErrors({isExists:"Account already Exists for this email!"});
                            this.userForm.setErrors({'invalid':true})
                            return;
                        }
                        else this.userForm.controls['email'].setErrors(null);
                        alert(err.error.message)
                    }
                );
    }
}