import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot,Router } from "@angular/router";

@Injectable()
export class AuthGaurdService implements CanActivate{
    constructor(
        private router: Router
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):boolean{
        
        const token = localStorage.getItem('token');
        if(!token){
            this.router.navigate(['login']);
        }
        return true;
    }
} 