import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: "app-user-details",
    template: `
        <p>user-details works!</p>
        <div>{{ user }}</div>
    `,
    styles: [],
})
export class UserDetailsComponent implements OnInit {
    user;

    constructor(private router: Router) {
        this.user = JSON.stringify(
            this.router.getCurrentNavigation().extras.state.user
        );
    }

    ngOnInit(): void {
        console.log(this.user);
    }
}
