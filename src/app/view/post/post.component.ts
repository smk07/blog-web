import { Router } from '@angular/router';
import { PostService } from './../../service/post.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit{
    @Input('posts') posts:any

    ngOnInit(){
        if(this.posts){
            console.log('posts')
            // console.log(typeof(this.posts))
            console.log(this.posts)
        }
        else{
            this.postSerivce.getPosts()
            .subscribe(
                (data)=>{console.log(data);this.posts = data.data},
                (err)=>{console.log(err);}
            )
        }
    }

    constructor(
        public router: Router,
        private postSerivce: PostService,
    ) {
        console.log(this.router.url)
    }
}