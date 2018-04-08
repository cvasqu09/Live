import { Routes, RouterModule } from "@angular/router";
import { ProfileComponent } from "./profile/profile.component";
import { HomeComponent } from "./home/home.component";
import { AuthGuard } from "./auth.guard";
import { TestMessageServiceComponent } from "./test-message-service/test-message-service.component";
import { ReviewComponent } from "./review/review.component";
/* This script is responsible for the frontend routes for the different
   "views/pages" a user of the application can visit */
const ROUTES: Routes = [
	// { path: '', redirectTo: 'signin', pathMatch: 'full'},
	// { path: "signin", component: }
	{ path: "profile", component: ProfileComponent, canActivate: [AuthGuard] }, // Change path to profile/:id once profiles are handled
	{ path: "home", component: HomeComponent, canActivate: [AuthGuard] },
	{ path: "sms", component: TestMessageServiceComponent, canActivate: [AuthGuard] },
	{ path: "review", component: ReviewComponent, canActivate: [AuthGuard] }
];

// Registers the frontend routes in angular
export const appRoutes = RouterModule.forRoot(ROUTES);
