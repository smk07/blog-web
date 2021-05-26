import { RouterStateSnapshot } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticateService } from './authenticate.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class IsVerifiedGaurd implements CanActivate{
    flag: boolean =false;
    constructor(
        private authService: AuthenticateService,
        private router:Router
    ) {}

    async canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):Promise<boolean>{

        await this.authService.isVerified()
        .toPromise()
        .then(async (data)=>{console.log(data);this.flag= (await data).data;console.log(this.flag)})
        .catch((err)=>{console.log(err); this.flag= err.data})
        // .subscribe(
        //     (data)=>{console.log(data); this.flag= data.data},
        //     (err)=>{console.log(err); this.flag= err.data},
        // );
        console.log(this.flag)
        if(!this.flag)
            this.router.navigate(['verify']);
        return true;
    }
}