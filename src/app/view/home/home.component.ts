import { Component, OnInit } from '@angular/core';

@Component({
    selector:'app-home',
    styleUrls:['./home.component.css'],
    templateUrl:'./home.component.html'
})
export class HomeComponent implements OnInit{
    content:string;

    constructor(){
        this.content = "Welcome to the home page"
    }
    
    ngOnInit(){
        
    }
}