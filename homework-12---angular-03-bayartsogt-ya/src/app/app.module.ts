import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { HomePageComponent } from "./home-page.component";

// imports of user module
import { UsersModule } from "./users.module";

@NgModule({
    declarations: [AppComponent, HomePageComponent],
    imports: [
        BrowserModule,
        UsersModule,
        RouterModule.forRoot([{ path: "", component: HomePageComponent }]),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
