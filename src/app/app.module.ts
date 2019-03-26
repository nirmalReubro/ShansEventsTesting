import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatDatepickerModule,
  MatExpansionModule,
  MatRadioModule,
  MatSelectModule,
  MatDialogModule
} from '@angular/material';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LightboxModule } from 'ngx-lightbox';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { RecaptchaModule } from 'angular-google-recaptcha';
import { NgxBraintreeModule } from 'ngx-braintree';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AboutUsComponent } from './about-us/about-us.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { OurServicesComponent } from './our-services/our-services.component';
import { EventGalleryComponent } from './event-gallery/event-gallery.component';
import { ResetPassComponent } from './reset-pass/reset-pass.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { BookingComponent } from './booking/booking.component';
import { RentalsComponent } from './rentals/rentals.component';
import { PurchasesComponent } from './purchases/purchases.component';
import { ErrorComponent } from './error/error.component';
import { ErrorInterceptor } from './error-interceptor';
import { PaymentComponent } from './payment/payment.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ForgotComponent } from './forgotDialog/forgot.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ContactUsComponent,
    AboutUsComponent,
    SignUpComponent,
    LoginComponent,
    ForgotPassComponent,
    OurServicesComponent,
    EventGalleryComponent,
    ResetPassComponent,
    BookingComponent,
    RentalsComponent,
    PurchasesComponent,
    ErrorComponent,
    PaymentComponent,
    ContactFormComponent,
    ForgotComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    LightboxModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatRadioModule,
    MatSelectModule,
    NgxSmartModalModule.forRoot(),
    NgxBraintreeModule,
    MatDialogModule,
    RecaptchaModule.forRoot({
      siteKey: '6LelvngUAAAAAPN6oEpHrpOaGSB-R-M6LMfE69b5'
    }),
    BrowserAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent, ForgotComponent],
})
export class AppModule { }
