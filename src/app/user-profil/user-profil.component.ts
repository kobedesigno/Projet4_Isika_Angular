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

  cryptoTabPrice: number[] = [];

  BTCUserHadEuro: number;
  ETHUserHadEuro: number;
  BNBUserHadEuro: number;
  LTCUserHadEuro: number;
  EOSUserHadEuro: number;
  BCHUserHadEuro: number;
  TRXUserHadEuro: number;
  NEOUserHadEuro: number;
  ADAUserHadEuro: number;
  XRPUserHadEuro: number;
  montantTotalPossede: number;

  constructor(private users: UsersService,
              private route: ActivatedRoute,
              private auth: AuthService,
              private crypto: CryptosService,
              private router: Router) {}

  ngOnInit() {
    this.userCall();
  } 

  userCall () {
    this.userId = this.auth.getUserId();
    this.loading = true;
    this.route.params.subscribe(
      (params) => {
        this.users.getUserById(this.userId).then(
          async (user: User) => {
            this.user = user;
            console.log(this.user)
            this.loading = false;
            this.cryptoCall();
            ;
          }
        );
      }
    )
  }

  cryptoCall() {
    this.userId = this.auth.getUserId();
    this.cryptoSub = this.crypto.cryptos$.subscribe(
    (cryptos) => {
      this.cryptos = cryptos;
      this.loading = false;
      for(var i = 0; i < cryptos.length; i++) {
        switch (this.cryptos[i]["cryptoName"]) {
          case 'BTC':
          case 'ETH':
          case 'BNB':
          case 'LTC':
          case 'EOS':
          case 'BCH':
          case 'TRX':
          case 'NEO':
          case 'ADA':
          case 'XRP':
            this.cryptoTabPrice.push(+cryptos[i]["price"]);
            break;
        }
      };
      console.log(this.cryptoTabPrice);
      console.log(this.user.btc);
      this.calculIntermediareUserHad();
    },
    (error) => {
      this.errorMsg = JSON.stringify(error);
      this.loading = false;
    });
    this.crypto.getCryptos();
  }

  calculIntermediareUserHad() {
    this.BCHUserHadEuro = this.cryptoTabPrice[0] * this.user.bch;
    this.XRPUserHadEuro = this.cryptoTabPrice[1] * this.user.xrp;
    this.ADAUserHadEuro = this.cryptoTabPrice[2] * this.user.ada;
    this.NEOUserHadEuro = this.cryptoTabPrice[3] * this.user.neo;
    this.TRXUserHadEuro = this.cryptoTabPrice[4] * this.user.trx;
    this.EOSUserHadEuro = this.cryptoTabPrice[5] * this.user.eos;
    this.LTCUserHadEuro = this.cryptoTabPrice[6] * this.user.ltc;
    this.BNBUserHadEuro = this.cryptoTabPrice[7] * this.user.bnb;
    this.ETHUserHadEuro = this.cryptoTabPrice[8] * this.user.eth;
    this.BTCUserHadEuro = this.cryptoTabPrice[9] * this.user.btc;
    console.log(this.BTCUserHadEuro
      + ' - ' + this.ETHUserHadEuro
      + ' - '+ this.BNBUserHadEuro
      + ' - '+ this.LTCUserHadEuro
      + ' - '+ this.EOSUserHadEuro
      + ' - '+ this.BCHUserHadEuro
      + ' - '+ this.TRXUserHadEuro
      + ' - '+ this.NEOUserHadEuro
      + ' - '+ this.ADAUserHadEuro
      + ' - '+ this.XRPUserHadEuro);
    this.montantTotalPossede = this.BTCUserHadEuro
    + this.ETHUserHadEuro
    + this.BNBUserHadEuro
    + this.LTCUserHadEuro
    + this.EOSUserHadEuro
    + this.BCHUserHadEuro
    + this.TRXUserHadEuro
    + this.NEOUserHadEuro
    + this.ADAUserHadEuro
    + this.XRPUserHadEuro;
  }

  onClickCrypto(cryptoName: string) {
    this.router.navigate(['crypto', cryptoName]);
  }

  onInvest() {
    this.router.navigate(['invest']);
  }

  onSell() {
    this.router.navigate(['sell']);
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