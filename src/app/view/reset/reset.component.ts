import { mustMatch } from 'src/app/validators/customValidators';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthenticateService } from './../../service/authenticate.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'app-reset',
    templateUrl: './reset.component.html',
    styleUrls: ['./reset.component.css']
})
export class ResetPassword implements OnInit{
    resetForm: any
    token: string

    ngOnInit(){
        this.route.queryParams
        .subscribe(
            (data)=>{console.log(data); this.token = data.token},
            (err)=>{console.log(err)}
        );
    }
    constructor(
        private route : ActivatedRoute,
        private router:Router,
        private authService: AuthenticateService,
        private fb:FormBuilder
    ) {
        this.token=""
        this.resetForm = this.fb.group({
            password: new FormControl("",[Validators.required]),
            rePassword: new FormControl("",[Validators.required])
        },{
            validator: mustMatch('password','rePassword')
        })
    }

    reset(){
        this.authService.resetPassword(this.resetForm,this.token)
            .subscribe(
                (data)=>{
                    console.log(data);
                    alert(data.message);
                    this.router.navigate(['login'])
                },
                (err)=>{
                    console.log(err);
                    alert(err.error.message);
                    this.router.navigate(['login'])}
            )
    }
}