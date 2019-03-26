import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HomeComponent } from './home/home.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { OurServicesComponent } from './our-services/our-services.component';
import { EventGalleryComponent } from './event-gallery/event-gallery.component';
import { ResetPassComponent } from './reset-pass/reset-pass.component';
import { BookingComponent } from "./booking/booking.component";
import { RentalsComponent } from "./rentals/rentals.component";
import { PurchasesComponent } from "./purchases/purchases.component";
import { AuthGuard } from "./auth.guard";
import { PaymentComponent } from "./payment/payment.component";

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'about-us', component: AboutUsComponent },
    { path: 'services', component: OurServicesComponent },
    { path: 'gallery', component: EventGalleryComponent },
    { path: 'event-gallery', component: EventGalleryComponent },
    { path: 'contact-us', component: ContactUsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'forgot-pass', component: ForgotPassComponent },
    { path: 'reset-pass', component: ResetPassComponent },
    { path: 'bookings', component: BookingComponent, canActivate: [AuthGuard] },
    { path: 'rentals', component: RentalsComponent, canActivate: [AuthGuard] },
    { path: 'purchases', component: PurchasesComponent, canActivate: [AuthGuard]  },
    { path: 'payment', component: PaymentComponent, canActivate: [AuthGuard]  },
    { path: 'resetPassword/:token', component: ResetPassComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule { }
