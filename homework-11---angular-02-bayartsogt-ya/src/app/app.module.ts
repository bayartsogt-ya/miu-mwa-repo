import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { Ex1DirectiveDirective } from "./ex1-directive.directive";
import { Ex2DirectiveDirective } from "./ex2-directive.directive";
import { MultiPipe } from "./multi.pipe";
import { MultiComponent } from './multi.component';

@NgModule({
    declarations: [
        AppComponent,
        Ex1DirectiveDirective,
        Ex2DirectiveDirective,
        MultiPipe,
        MultiComponent,
    ],
    imports: [BrowserModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
