import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { PlaceOrderComponent } from './pages/place-order/place-order.component';
import { RouterModule } from '@angular/router';
import { ProductListComponent } from './pages/patient/product-list/product-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { NavigationBarComponent } from './layout/navigation-bar/navigation-bar.component';
import { PaginationControlComponent } from './components/pagination-control/pagination-control.component';
import { EditFormComponent } from './components/edit-form/edit-form.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ChatroomComponent } from './pages/patient/chatroom/chatroom.component';
import { MDBBootstrapModule} from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginInterceptor } from './core/interceptor';
import { LoginComponent } from './pages/login/login.component';
import { GraphQLModule } from './graphql.module';
import { ChangePasswordComponent } from './pages/profile/change-password/change-password.component';
import { ToastsContainer } from './components/toast/toasts-container.component';
import { UpdateProfileComponent } from './pages/profile/update-profile/update-profile.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { RecoverPasswordComponent } from './pages/recover-password/recover-password.component';
import { MillisecondToMinuteSecondPipe } from './core/pipe/millisecond-to-minute-second.pipe';
import { CartComponent } from './pages/patient/cart/cart.component';
import { ProductBannerComponent } from './components/product-banner/product-banner.component';
import { CheckoutComponent } from './pages/patient/checkout/checkout.component';
import { InquiryFormComponent } from './pages/patient/inquiry-form/inquiry-form.component';
import { AppointmentComponent } from './pages/patient/appointment/appointment.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { QrScannerComponent } from './components/qr-scanner/qr-scanner.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import {MatTableModule} from '@angular/material/table';
import { NgbAccordionModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { DashboardComponent } from './pages/patient/dashboard/dashboard.component';
import {UploadFileComponent} from "./components/upload-file/upload-file.component";
import {CalendarModule, DateAdapter} from "angular-calendar";
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NotificationComponent } from './components/notification/notification.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatBadgeModule} from "@angular/material/badge";
import {AdminModule} from "./pages/admin/admin.module";
import {PatientModule} from "./pages/patient/patient.module";
import {InquiryFormModule} from "./pages/patient/inquiry-form/inquiry-form.module";
import {AppointmentModule} from "./pages/patient/appointment/appointment.module";
import {CheckoutModule} from "./pages/patient/checkout/checkout.module";
import {ProductBannerModule} from "./components/product-banner/product-banner.module";
import {ConfirmationDialogComponent} from "./components/dialog/confirmation-dialog/confirmation-dialog.component";
import {SidebarComponent} from "./layout/sidebar/sidebar.component";
import {AuthConfig, OAuthModule} from "angular-oauth2-oidc";

export const authCodeFlowConfig: AuthConfig = {
  // Url of the Identity Provider
  issuer: 'http://localhost:8080/realms/clinic-spring',

  // URL of the SPA to redirect the user to after login
  redirectUri: 'http://localhost:9000/login/oauth2/code/*',

  // The SPA's id. The SPA is registerd with this id at the auth-server
  // clientId: 'server.code',
  clientId: 'clinic-client',

  // Just needed if your auth server demands a secret. In general, this
  // is a sign that the auth server is not configured with SPAs in mind
  // and it might not enforce further best practices vital for security
  // such applications.
  // dummyClientSecret: 'secret',

  responseType: 'code',

  // set the scope for the permissions the client should request
  // The first four are defined by OIDC.
  // Important: Request offline_access to get a refresh token
  // The api scope is a usecase specific one
  scope: 'openid profile email offline_access api',

  showDebugInformation: true,
};

@NgModule({
  declarations: [
    AppComponent,
    PlaceOrderComponent,
    // ProductListComponent,
    NavigationBarComponent,
    PaginationControlComponent,
    EditFormComponent,
    LoginComponent,
    ProfileComponent,
    ChangePasswordComponent,
    ToastsContainer,
    UpdateProfileComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    RecoverPasswordComponent,
    MillisecondToMinuteSecondPipe,
    QrScannerComponent,
    UploadFileComponent,
    NotificationComponent,
    ConfirmationDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    FormsModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    GraphQLModule,
    ScrollingModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    ZXingScannerModule,
    NgbModalModule,
    NgbAccordionModule,
    MatIconModule,
    MatBadgeModule,
    SidebarComponent,
    OAuthModule.forRoot()
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: LoginInterceptor, multi: true
  },
    // {
    //   provide:LOCALE_ID,useValue:'cn'
    // }
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
