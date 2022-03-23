import { Component, OnInit } from '@angular/core';
import { Crypto } from '../models/Crypto.model';
import { CryptosService } from '../_services/cryptos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
//import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-crypto-single',
  templateUrl: './crypto-single.component.html',
  styleUrls: ['./crypto-single.component.scss']
})
export class CryptoSingleComponent implements OnInit {

  loading: boolean;
  cryptoSub: Subscription;
  cryptos: Crypto[];
  userId: string;
  errorMsg: string;

  constructor(private crypto: CryptosService,
              private route: ActivatedRoute,
              // private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    // this.loading = true;
    // this.cryptoSub = this.crypto.cryptos$.subscribe(
    //   (cryptos) => {
    //     this.cryptos = cryptos;
    //     this.loading = false;
    //     this.errorMsg = null;
    //   },
    //   (error) => {
    //     this.errorMsg = JSON.stringify(error);
    //     this.loading = false;
    //   }
    // );
    // this.crypto.getCryptosByName(this.crypto.cryptoName);

    // this.loading = true;
    // this.route.params.subscribe(
    //   (params) => {
    //     this.crypto.getCryptosByName(params['cryptoName']).then(
    //       (crypto : Crypto) => {
    //         this.crypto = crypto;
    //         this.loading = false;
    //       }
    //     );
    //   }
    // );
  }

  onBack() {
    this.router.navigate(['/cryptos']);
  }

}

