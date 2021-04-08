import { Injectable } from "@angular/core";
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class UsersUuidGuard implements CanActivate {
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        if (route.params.uuid.split("-").length == 5) return true;
        else {
            alert("wrong uuid");
            return false;
        }
    }
}
