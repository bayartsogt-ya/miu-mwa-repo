import { Component, OnInit } from "@angular/core";

@Component({
    selector: "multi",
    template: ` <p>{{ name | multi: 5 }}</p> `,
})
export class MultiComponent implements OnInit {
    name = "Bayartsogt";
    constructor() {}

    ngOnInit(): void {}
}
