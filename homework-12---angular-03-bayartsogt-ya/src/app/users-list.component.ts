import { Component, OnInit } from "@angular/core";
import { UsersDataService } from "./users-data.service";
import { HttpClient, HttpResponse } from "@angular/common/http";

@Component({
    selector: "app-users-list",
    template: `
        <ul *ngIf="(users$ | async)?.results.length > 0">
            <li *ngFor="let user of (users$ | async)?.results">
                <a [routerLink]="[user.login.uuid]" [state]="{ user: user }">
                    {{ user.name.first }} {{ user.name.last }}
                </a>
            </li>
        </ul>
    `,
    styles: [],
    providers: [],
})
export class UsersListComponent implements OnInit {
    users$;
    constructor(private usersDataService: UsersDataService) {}

    ngOnInit(): void {
        this.users$ = this.usersDataService.getData();
    }
}
