import { Component } from "@angular/core";

@Component({
    selector: "app-root",
    template: `<div>
        <h3>App Component</h3>
        <a [routerLink]="['']">HOME</a> |
        <a [routerLink]="['users']">USERS</a>
        <router-outlet></router-outlet>
    </div>`,
})
export class AppComponent {
    title = "homework12";
}
