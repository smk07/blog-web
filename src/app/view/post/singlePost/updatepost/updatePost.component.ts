import { PostService } from './../../../../service/post.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector:'app-update-post',
    templateUrl: './updatePost.component.html',
    styleUrls: ['./updatePost.component.css'],
})
export class UpdatePostComponent implements OnInit{
    updateForm: any
    postId:any

    ngOnInit(){
        this.route.firstChild?.paramMap
        .subscribe(
            (params)=>{
                console.log(params);
                console.log(this.route.firstChild)
                const id = params.get('id')
                if(id){
                    this.postId = id
                    this.postService.getPost(id).subscribe(
                        (resp)=>{
                            console.log(resp);
                            this.updateForm.patchValue({
                                title:resp.data.title,
                                description: resp.data.description,
                            })
                            console.log(resp.data.title)
                            // this.updateForm.controls['title'].setValue(resp.data.title);
                        },
                        (err)=>{
                            console.log(err);
                            alert("This post doesn't exist");
                            this.router.navigate(['posts'])
                        }
                    );
                }
            }
        );
    }

    constructor(
        private router: Router,
        private route:ActivatedRoute,
        private fb:FormBuilder,
        private postService: PostService,
    ) {
        this.postId = null
        this.updateForm = this.fb.group({
            title : new FormControl("",[Validators.required]),
            description: new FormControl("",[Validators.required]),
        });
    }

    savePost(){
        this.postService.savePost(this.postId,this.updateForm)
        .subscribe(
            (data)=>{
                console.log(data);
                alert(data.message);
                this.router.navigate([`posts/${data.data._id}`]);
            },
            (err)=>{console.log(err);alert("Error exisits in editing")}
        )
    }

    reset(){
        this.updateForm.patchValue({
            title:'',
            description:'',
        })
    }
    back(){
        this.router.navigate([`posts/${this.postId?this.postId:''}`])
    }
}