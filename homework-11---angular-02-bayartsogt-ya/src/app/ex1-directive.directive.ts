import {
    Directive,
    ElementRef,
    HostListener,
    Input,
    Renderer2,
} from "@angular/core";

@Directive({
    selector: "[visible]",
})
export class Ex1DirectiveDirective {
    @Input() visible;
    constructor(private elemRef: ElementRef, private renderer: Renderer2) {
        console.log("constructor of visible");
    }

    ngOnInit() {
        console.log(this.visible);
        this.renderer.setStyle(
            this.elemRef.nativeElement,
            "display",
            this.visible ? "block" : "none"
        );
    }
}
