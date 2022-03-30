import { Component, OnInit } from '@angular/core';
import { CryptosService } from '../_services/cryptos.service';
import { Subscription } from 'rxjs';
import { Crypto } from '../models/Crypto.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crypto-list',
  templateUrl: './crypto-list.component.html',
  styleUrls: ['./crypto-list.component.scss']
})
export class CryptoListComponent implements OnInit {

  cryptoSub: Subscription;
  cryptos: Crypto[];
  loading: boolean;
  errorMsg: string;

  constructor(private crypto: CryptosService,
              private router: Router) { }

  ngOnInit() {
    this.loading = true;
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

  cryptoTabImg = [
    './assets/images/bch.png',
    './assets/images/xrp.png',
    './assets/images/ada.png',
    './assets/images/neo.png',
    './assets/images/trx.png',
    './assets/images/eos.png',
    './assets/images/ltc.png',
    './assets/images/bnb.png',
    './assets/images/eth.png',
    './assets/images/btc.png',
  ]

}
