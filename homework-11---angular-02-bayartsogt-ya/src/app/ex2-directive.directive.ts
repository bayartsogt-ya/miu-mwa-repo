import {
    Directive,
    ElementRef,
    HostListener,
    Input,
    Renderer2,
} from "@angular/core";

@Directive({
    selector: "[makeBigger]",
})
export class Ex2DirectiveDirective {
    @Input() makeBigger;

    constructor(private elemRef: ElementRef, private renderer: Renderer2) {}

    @HostListener("click") foo() {
        console.log("clicked");
        let currentSize = parseInt(
            window
                .getComputedStyle(this.elemRef.nativeElement)
                .getPropertyValue("font-size")
                .split("px")[0]
        );

        currentSize = currentSize + this.makeBigger;

        this.renderer.setStyle(
            this.elemRef.nativeElement,
            "font-size",
            `${currentSize}px`
        );
    }
}
