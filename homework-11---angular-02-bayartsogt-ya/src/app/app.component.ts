import { Component } from "@angular/core";

@Component({
    selector: "app-root",
    template: `
        <h2>App Component</h2>
        <p [visible]="true">Exercise 1</p>
        <p [makeBigger]="5">Exercise 2</p>
        <multi [makeBigger]="5">Exercise 3</multi>
    `,
})
export class AppComponent {
    title = "homework11";
}
