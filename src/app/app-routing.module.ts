import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CryptoListComponent } from './crypto-list/crypto-list.component';
import { CryptoFormComponent } from './crypto-form/crypto-form.component';
import { SingleCryptoComponent } from './single-crypto/single-crypto.component';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'mod', component: BoardModeratorComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: 'cryptos', component: CryptoListComponent} , // ,canActivate: [AuthGuard] },
  { path: 'crypto/:cryptoName', component: SingleCryptoComponent},
  { path: 'invest-crypto/:id', component: CryptoFormComponent},
  { path: '', pathMatch: 'full', redirectTo: 'cryptos'},
  { path: '**', redirectTo: 'crytpos' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
