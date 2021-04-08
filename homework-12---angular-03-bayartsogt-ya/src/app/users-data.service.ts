import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class UsersDataService {
    constructor(public http: HttpClient) {}

    getData = () => {
        return this.http.get("https://randomuser.me/api/?results=2");
    };
}
