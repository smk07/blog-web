import { AuthenticateService } from './service/authenticate.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'blog-web';

  constructor(
    private router:Router,
    private authService: AuthenticateService
  ){}

  ngOnInit(){
    let token = localStorage.getItem('token');
    // if(!token){
    //   this.router.navigate(['login']);
    // }
  }
}
