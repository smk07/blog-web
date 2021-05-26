import { Router } from '@angular/router';
import { AuthenticateService } from './../../service/authenticate.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector:'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit{
    notifications: any

    ngOnInit(){
        this.authService.getNotifications()
        .subscribe(
            (data)=>{
                console.log(data);
                this.notifications = data.data;
            },
            (err)=>{
                console.log(err);
            }
        )
    }


    constructor(
        private authService: AuthenticateService,
        private router: Router,
    ) {}

    read(id:any,i:any){
        this.authService.updateNotification(id).subscribe(
            (data)=> {console.log(data)},
            (err)=>{console.log(err.error.message)},
            ()=>{
                this.notifications[i].read = true;
            }
        );
    }
}