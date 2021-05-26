import { NotificationComponent } from './view/notification/notification.component';
import { UpdatePostComponent } from './view/post/singlePost/updatepost/updatePost.component';
import { PostComponent } from './view/post/post.component';
import { ProfileComponent } from './view/profile/profile.component';
import { ResetPassword } from './view/reset/reset.component';
import { ForgotComponent } from './view/forgot/forgot.component';
import { VerifyComponent } from './view/verify/verify.component';
import { IsVerifiedGaurd } from './service/isVerifiedGaurd.service';
import { AuthGaurdService } from './service/AuthGaurd.service';
import { SignupComponent } from './view/signup/signup.component';
import { HomeComponent } from './view/home/home.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './view/login/login.component';
import { SinglePostComponent } from './view/post/singlePost/singlePost.component';

const routes: Routes = [
  {
    path:"home",
    component: HomeComponent,
    canActivate: [AuthGaurdService,IsVerifiedGaurd]
  },
  {
    path:"",
    component: HomeComponent,
    canActivate: [AuthGaurdService,IsVerifiedGaurd],
  },
  {
    path:"profile/:uname",
    component: ProfileComponent,
  },
  {
    path:"login",
    component: LoginComponent,
  },
  {
    path:"signup",
    component: SignupComponent,
  },
  {
    path:"verify",
    component: VerifyComponent,
    canActivate: [AuthGaurdService]
  },
  {
    path:"forgot",
    component: ForgotComponent,
  },
  {
    path:"reset",
    component: ResetPassword,
  },
  {
    path:"posts",
    component: PostComponent,
    canActivate:[AuthGaurdService,IsVerifiedGaurd],
  },
  {
    path: "posts/:id",
    component: SinglePostComponent,
    canActivate: [AuthGaurdService,IsVerifiedGaurd],
  },
  {
    path: "post",
    component: UpdatePostComponent,
    canActivate: [AuthGaurdService,IsVerifiedGaurd],
    children:[
      {path:'add',component:SinglePostComponent},
      {path:':id',component:SinglePostComponent},
    ]
  },
  {
    path:"notifications",
    component: NotificationComponent,
    canActivate: [AuthGaurdService,IsVerifiedGaurd],
  },
  {
    path:'**',
    redirectTo:"/home",
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
