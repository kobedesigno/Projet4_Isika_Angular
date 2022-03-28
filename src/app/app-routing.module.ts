import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CryptoListComponent } from './crypto-list/crypto-list.component';
import { CryptoSingleComponent } from './crypto-single/crypto-single.component';
import { UserInvestComponent } from './user-invest/user-invest.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { UserProfilComponent } from './user-profile/user-profil.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profil', component: UserProfilComponent },
  { path: 'cryptos', component: CryptoListComponent},// ,canActivate: [AuthGuard] },
  { path: 'invest', component: UserInvestComponent,
    // children: [ 
    //   { path: 'calculatrice/:mode', component: BchComponent },
    // ],
  },
  { path: 'crypto/:cryptoName', component: CryptoSingleComponent},
  { path: '', pathMatch: 'full', redirectTo: 'cryptos'},
  { path: '**', redirectTo: 'crytpos' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
