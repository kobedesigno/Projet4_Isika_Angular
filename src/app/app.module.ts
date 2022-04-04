import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CryptoListComponent } from './crypto-list/crypto-list.component';
import { HeaderComponent } from './component/header/header.component';
import { CryptoSingleComponent } from './crypto-single/crypto-single.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './auth/login/login.component';
import { UserProfilComponent } from './user-profil/user-profil.component';
import { RegisterComponent } from './auth/register/register.component';
import { UserInvestComponent } from './user-invest/user-invest.component';
import { UserSellComponent } from './user-sell/user-sell.component';

import { AuthInterceptor } from './_interceptors/auth-interceptor';
import { FooterComponent } from './component/footer/footer.component';
import { AcceuilComponent } from './acceuil/acceuil.component';

// import { CommonModule } from '@angular/common';
// import { ChartjsComponent } from './chartjs.component';
// import { ChartjsRoutingModule } from './chartjs-routing.module';
 import { NgChartsModule } from 'ng2-charts';
 import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    CryptoListComponent,
    HeaderComponent,
    CryptoSingleComponent,
    LoginComponent,
    UserProfilComponent,
    RegisterComponent,
    UserInvestComponent,
    UserSellComponent,
    FooterComponent,
    AcceuilComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    NgChartsModule,
    // MatProgressSpinnerModule,
    // MatButtonModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
