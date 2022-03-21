import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CryptoFormComponent } from './crypto-form/crypto-form.component';
import { CryptoListComponent } from './crypto-list/crypto-list.component';
import { HeaderComponent } from './header/header.component';
import { SingleCryptoComponent } from './single-crypto/single-crypto.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    // SignupComponent,
    // LoginComponent,
    CryptoFormComponent,
    CryptoListComponent,
    HeaderComponent,
    SingleCryptoComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    LoginComponent,
    ProfileComponent,
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
  providers: [authInterceptorProviders],//{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  bootstrap: [AppComponent]
})
export class AppModule { }
