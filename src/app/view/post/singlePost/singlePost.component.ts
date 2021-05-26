import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { DataSharingService } from './../../../service/dataSharing.service';
import { PostService } from './../../../service/post.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector:'app-single-post',
    templateUrl: './singlePost.component.html',
    styleUrls: ['./singlePost.component.css']
})
export class SinglePostComponent implements OnInit{
    post:any
    loading = false;
    liked = false
    commentForm : any
    edited = false;
    editForm :any;
    likedC = false;

    ngOnInit(){
        this.loading=true
        this.route.paramMap
        .subscribe((params)=>{
            console.log(params)
            const id = params.get("id");
            this.postService.getPost(id)
            .subscribe(
                (data)=>{
                    console.log(data);
                    this.post=data.data;
                    this.loading=false;
                    this.liked = this.post.likedBy.includes(this.dsc.uname.value);
                },
                (err)=>{console.log(err);}
            );
        });
    }
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private postService: PostService,
        public dsc: DataSharingService,
        private fb:FormBuilder,
    ) {
        this.commentForm = this.fb.group({
            content: new FormControl("",[Validators.required]),
        })
        this.editForm = this.fb.group({
            content: new FormControl("",[Validators.required]),
        })
    }
    
    deletePost(id:any){
        console.log(id);
        this.postService.deletePost(id).subscribe(
            (data)=>{console.log(data);alert(data.message);},
            (err)=>{console.log(err);alert("Error in deleting the post")},
            ()=>this.router.navigate(['posts'])
        );
    }

    likePost(id:any){
        this.postService.likePost(id)
        .subscribe(
            (data)=>{console.log(data);this.liked=true;this.post.likedBy.push(this.dsc.uname.value);},
            (err)=> {console.log(err);alert(err.error.message);}
        );
    }

    unlikePost(id:any){
        this.postService.unlikePost(id)
        .subscribe(
            (data)=>{console.log(data);this.liked=false;this.post.likedBy.pop(this.dsc.uname.value);},
            (err)=> {console.log(err);alert(err.error.message);}
        );
    }

    likeComment(pid:any,cid:any){
        this.postService.likeComment(pid,cid)
        .subscribe(
            (data)=>{
                console.log(data);
                this.likedC=true;
                // this.post.likedBy.push(this.dsc.uname.value);
                this.post.comments.forEach((comment:any,index:number) => {
                    if(comment._id==cid && !this.post.comments[index].likedBy.includes(this.dsc.uname.value))
                        this.post.comments[index].likedBy.push(this.dsc.uname.value)
                });
            },
            (err)=> {console.log(err);alert(err.error.message);}
        );
    }

    unlikeComment(pid:any,cid:any){
        this.postService.unlikeComment(pid,cid)
        .subscribe(
            (data)=>{
                console.log(data);
                this.likedC=false;
                // this.post.likedBy.push(this.dsc.uname.value);
                this.post.comments.forEach((comment:any,index:number) => {
                    if(comment._id==cid && this.post.comments[index].likedBy.includes(this.dsc.uname.value))
                        this.post.comments[index].likedBy.pop(this.dsc.uname.value)
                });
            },
            (err)=> {console.log(err);alert(err.error.message);}
        );
    }

    addComment(id:any){
        this.loading = true;
        this.postService.addComment(this.commentForm,id)
        .subscribe(
            (data)=>{
                console.log(data);
                this.post.comments.push(data.data);
                this.commentForm.controls['content'].setValue('');
                this.loading = false;
            },
            (err)=>{console.log(err);}
        );
    }

    deleteComment(postId:any,id:any){
        this.loading = true;
        this.postService.deleteComment(postId,id)
        .subscribe(
            (data)=>{
                console.log(data);
                this.post.comments.forEach((comment:any,index:number) => {
                    if(comment._id==id) delete this.post.comments[index];
                });
                console.log(this.post);
                this.loading = false;
                alert("Comment deleted"); 
            },
            (err)=>{console.log(err);alert("Error in deleting the comment")}
        );
    }

    editty(value:any){
        this.edited = true;
        this.editForm.controls['content'].setValue(value);
    }

    editComment(postId:any,cid:any){
        this.postService.editComment(postId,cid,this.editForm)
        .subscribe(
            (data)=>{
                console.log(data);
                this.post.comments.forEach((comment:any,index:number) => {
                    if(comment._id==cid) this.post.comments[index]=data.data;
                });
                this.edited = false
            },
            (err)=>{
                console.log(err);
            }
        )
    }
}