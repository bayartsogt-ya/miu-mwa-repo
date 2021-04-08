import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UsersListComponent } from "./users-list.component";
import { UserDetailsComponent } from "./user-details.component";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { UsersUuidGuard } from "./users-uuid.guard";

@NgModule({
    declarations: [UsersListComponent, UserDetailsComponent],
    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule.forChild([
            { path: "users", component: UsersListComponent },
            {
                path: "users/:uuid",
                component: UserDetailsComponent,
                canActivate: [UsersUuidGuard],
            },
        ]),
    ],
    exports: [UsersListComponent, UserDetailsComponent],
})
export class UsersModule {}
