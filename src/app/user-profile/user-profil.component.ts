import { Component, OnInit } from '@angular/core';
// import { TokenStorageService } from '../_services/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../models/User.model';
import { Crypto } from '../models/Crypto.model';
import { AuthService } from '../_services/auth.service';
import { CryptosService } from '../_services/cryptos.service';
import { UsersService } from '../_services/users.service';

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.scss']
})
export class UserProfilComponent implements OnInit {

  loading: boolean;
  user: User;
  userId: number;
  errorMessage: string;
  cryptoSub: Subscription;
  cryptos: Crypto[];
  errorMsg: string;

  constructor(private users: UsersService,
              private route: ActivatedRoute,
              private auth: AuthService,
              private crypto: CryptosService,
              private router: Router) {}

  ngOnInit() {
    this.userId = this.auth.getUserId();
    this.loading = true;
    this.route.params.subscribe(
      (params) => {
        this.users.getUserById(this.userId).then(
          (user: User) => {
            this.user = user;
            console.log(this.user)
            this.loading = false;
          }
        );
      }
    );
    this.userId = this.auth.getUserId();

    this.cryptoSub = this.crypto.cryptos$.subscribe(
      (cryptos) => {
        this.cryptos = cryptos;
        this.loading = false;
        this.errorMsg = null;
      },
      (error) => {
        this.errorMsg = JSON.stringify(error);
        this.loading = false;
      }
    );
    this.crypto.getCryptos();
  }

  onClickCrypto(cryptoName: string) {
    this.router.navigate(['crypto', cryptoName]);
  }

  onBack() {
    this.router.navigate(['/cryptos']);
  }

  onInvest() {
    this.router.navigate(['/user-invest', this.user.id]);
  }

  // onDelete() {
  //   this.loading = true;
  //   this.users.deleteUser(this.user._id).then(
  //     (response: { message: string }) => {
  //       console.log(response.message);
  //       this.loading = false;
  //       this.router.navigate(['/cryptos']);
  //     }
  //   ).catch(
  //     (error) => {
  //       this.loading = false;
  //       this.errorMessage = error.message;
  //       console.error(error);
  //     }
  //   );
  // }
}