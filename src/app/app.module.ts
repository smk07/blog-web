import { NotificationComponent } from './view/notification/notification.component';
import { UpdatePostComponent } from './view/post/singlePost/updatepost/updatePost.component';
import { PostService } from './service/post.service';
import { PostComponent } from './view/post/post.component';
import { ProfileComponent } from './view/profile/profile.component';
import { ResetPassword } from './view/reset/reset.component';
import { ForgotComponent } from './view/forgot/forgot.component';
import { DataSharingService } from './service/dataSharing.service';
import { VerifyComponent } from './view/verify/verify.component';
import { IsVerifiedGaurd } from './service/isVerifiedGaurd.service';
import { AuthGaurdService } from './service/AuthGaurd.service';
import { SignupComponent } from './view/signup/signup.component';
import { HomeComponent } from './view/home/home.component';
import { AuthenticateService } from './service/authenticate.service';
import { HeaderComponent } from './view/header/header.component';
import { RequestInterceptor } from './RequestInterceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './view/login/login.component';
import { SinglePostComponent } from './view/post/singlePost/singlePost.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    VerifyComponent,
    ForgotComponent,
    ResetPassword,
    ProfileComponent,
    PostComponent,
    SinglePostComponent,
    UpdatePostComponent,
    NotificationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthenticateService,
    AuthGaurdService,
    IsVerifiedGaurd,
    PostService,
    DataSharingService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
