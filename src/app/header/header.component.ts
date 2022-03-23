import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../_services/auth.service';
// import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuth: boolean;
  authSubscription: Subscription;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.authSubscription = this.auth.isAuth$.subscribe(
      (auth) => {
        this.isAuth = auth;
      }
    );
  }

  onLogout() {
    this.auth.logout();
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

}

// export class HeaderComponent implements OnInit {

//   isLoggedIn = false;
//   showAdminBoard = false;
//   showModeratorBoard = false;
//   username?: string;

//   constructor(private tokenStorageService: TokenStorageService) { }

//   ngOnInit(): void {
//     this.isLoggedIn = !!this.tokenStorageService.getToken();

//     if (this.isLoggedIn) {
//       const user = this.tokenStorageService.getUser();

//       this.username = user.username;
//     }
//   }

//   logout(): void {
//     this.tokenStorageService.signOut();
//     window.location.reload();
//   }

// }
