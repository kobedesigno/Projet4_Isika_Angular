import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CryptoListComponent } from './crypto-list/crypto-list.component';
import { HeaderComponent } from './header/header.component';
import { CryptoSingleComponent } from './crypto-single/crypto-single.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './auth/login/login.component';
import { UserProfilComponent } from './user-profile/user-profil.component';
import { RegisterComponent } from './auth/register/register.component';

import { AuthInterceptor } from './_interceptors/auth-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    CryptoListComponent,
    HeaderComponent,
    CryptoSingleComponent,
    LoginComponent,
    UserProfilComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    // MatProgressSpinnerModule,
    // MatButtonModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
