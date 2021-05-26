import { AuthenticateService } from './../../service/authenticate.service';
import { Router } from '@angular/router';
import { OnInit, Component } from '@angular/core';

@Component({
    selector:'app-verify',
    templateUrl: './verify.component.html',
    styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit{
    verified:boolean =false;
    async ngOnInit(){
        await this.authService.isVerified().toPromise()
        .then(async (data)=>{console.log(data);this.verified= (await data).data;console.log(this.verified)})
        .catch((err)=>{console.log(err); this.verified= err.data});

        console.log(this.verified);

        if(this.verified)
            this.router.navigate(['home']);
    }

    constructor(
        private router:Router,
        private authService: AuthenticateService
    ) {}

    resend(){
        this.authService.resendVerification()
        .subscribe(
            (data)=>{console.log(data);alert(data.message)},
            (err)=>{console.log(err);alert("There is error in resending the verification email!")}
        );
    }
}