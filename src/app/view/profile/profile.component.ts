import { DataSharingService } from './../../service/dataSharing.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticateService } from './../../service/authenticate.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
    response:any
    uname = ""
    subscribed = false

    ngOnInit(){
        this.route.paramMap.subscribe((params)=>{
            console.log(params);
            const uname = params.get("uname");
            if(uname)
                this.uname = uname
            this.authService.getProfile(uname)
            .subscribe(
                (data)=>{
                    console.log(data); 
                    this.response = data;
                    this.subscribed = this.response.data.user.subscribers.includes(this.dsc.uname.value);
                },
                (err) =>{console.log(err);this.response=null;},
            )
        })
    }

    constructor (
        private authService: AuthenticateService,
        private route: ActivatedRoute,
        private router: Router,
        public dsc: DataSharingService
    ) {}

    subscribe(){
        console.log("subscribed");
        this.subscribed = true;
        this.authService.subscribe(this.uname).subscribe(
            (data)=>{console.log(data);alert(data.message);},
            (err)=>{console.log(err);alert(err.error.message);}
        );
    }

    
    unSubscribe(){
        console.log("unSubscribed");
        this.subscribed = false;
        this.authService.unSubscribe(this.uname).subscribe(
            (data)=>{console.log(data);alert(data.message);},
            (err)=>{console.log(err);alert(err.error.message);}
        );
    }

} 