import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticateService } from './../../service/authenticate.service';
import { OnInit, Component } from '@angular/core';

@Component({
    selector:'app-forgot',
    templateUrl: './forgot.component.html',
    styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit{
    forgotForm:any;
    
    ngOnInit(){

    }

    constructor(
        private authService: AuthenticateService,
        private router:Router,
        private fb: FormBuilder
    )
    {
        this.forgotForm = this.fb.group({
            loginId: new FormControl("",[Validators.required])
        });
    }

    forgot(){
        this.authService.forgotPassword(this.forgotForm)
            .subscribe(
                (data)=>{alert(`${data.message}`)},
                (err) =>{alert(`${err.error.message}`)}
            )
    }
}