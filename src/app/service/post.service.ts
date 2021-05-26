import { host } from './URLConstants';
import { HttpClient } from '@angular/common/http';
import { OnInit, Injectable } from '@angular/core';

@Injectable()
export class PostService implements OnInit{
    ngOnInit(){

    }

    constructor(private http:HttpClient) {}

    getPosts(){
        return this.http.get<any>(`${host}/posts`,{});
    }

    getPost(id:any){
        return this.http.get<any>(`${host}/posts/${id}`);
    }

    savePost(id:any,updateForm:any){
        if(id)
            return this.http.put<any>(`${host}/posts/${id}`,{
                title:updateForm.value.title,
                description: updateForm.value.description,
            });
        return this.http.post<any>(`${host}/posts/`,{
            title:updateForm.value.title,
            description: updateForm.value.description,
        });
    }

    deletePost(id:any){
        return this.http.delete<any>(`${host}/posts/${id}`,{});
    }

    addComment(commentForm:any,id:any){
        return this.http.post<any>(`${host}/posts/${id}/comment`,{
            content: commentForm.value.content,
        });
    }

    editComment(postId:any,id:any,editForm:any){
        return this.http.put<any>(`${host}/posts/${postId}/comment/${id}`,{
            content: editForm.value.content
        })
    }

    deleteComment(pid:any,cid:any){
        return this.http.delete<any>(`${host}/posts/${pid}/comment/${cid}`);
    }

    likePost(id:any){
        return this.http.post<any>(`${host}/posts/${id}/like`,{});
    }

    unlikePost(id:any){
        return this.http.post<any>(`${host}/posts/${id}/unlike`,{});
    }

    likeComment(pid:any,cid:any){
        return this.http.post<any>(`${host}/posts/${pid}/comment/${cid}/like`,{});
    }

    unlikeComment(pid:any,cid:any){
        return this.http.post<any>(`${host}/posts/${pid}/comment/${cid}/unlike`,{});
    }
}