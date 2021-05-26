import { BehaviorSubject } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';

@Injectable()
export class DataSharingService implements OnInit{
    public isLoggedIn : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public uname: BehaviorSubject<string> = new BehaviorSubject<string>("");
    public userRole: BehaviorSubject<string> = new BehaviorSubject<string>("member");
    ngOnInit(){

    }
}