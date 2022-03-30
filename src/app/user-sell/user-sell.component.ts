import { Component, OnInit } from '@angular/core';
// import { TokenStorageService } from '../_services/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../models/User.model';
import { Crypto } from '../models/Crypto.model';
import { AuthService } from '../_services/auth.service';
import { CryptosService } from '../_services/cryptos.service';
import { UsersService } from '../_services/users.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-sell',
  templateUrl: './user-sell.component.html',
  styleUrls: ['./user-sell.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class UserSellComponent implements OnInit {

  isAuth: boolean;
  authSubscription: Subscription;

  userForm: FormGroup;
  loading: boolean;
  tableIsVisible: boolean;
  user: User;
  userId: number;
  errorMessage: string;
  cryptoSub: Subscription;
  cryptos: Crypto[];
  errorMsg: string;
  loadingSellCrypto: boolean;

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


  cryptoSelectedOpen: string;
  isBTCvisible: boolean;
  isETHvisible: boolean;
  isBNBvisible: boolean;
  isLTCvisible: boolean;
  isEOSvisible: boolean;
  isBCHvisible: boolean;
  isTRXvisible: boolean;
  isNEOvisible: boolean;
  isADAvisible: boolean;
  isXRPvisible: boolean;

  BTCSelectedBuy: number;
  ETHSelectedBuy: number;
  BNBSelectedBuy: number;
  LTCSelectedBuy: number;
  EOSSelectedBuy: number;
  BCHSelectedBuy: number;
  TRXSelectedBuy: number;
  NEOSelectedBuy: number;
  ADASelectedBuy: number;
  XRPSelectedBuy: number;

  BTCSelectedBuyResult: number;
  ETHSelectedBuyResult: number;
  BNBSelectedBuyResult: number;
  LTCSelectedBuyResult: number;
  EOSSelectedBuyResult: number;
  BCHSelectedBuyResult: number;
  TRXSelectedBuyResult: number;
  NEOSelectedBuyResult: number;
  ADASelectedBuyResult: number;
  XRPSelectedBuyResult: number;
  cryptoTabBuy: number[] = [];

  constructor(private users: UsersService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private auth: AuthService,
              private crypto: CryptosService,
              private router: Router,
              config: NgbModalConfig, 
              private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
              }

  open(content) {
    this.modalService.open(content);
  }

  ngOnInit() {
    this.userCall();

    this.authSubscription = this.auth.isAuth$.subscribe(
      (auth) => {
        this.isAuth = auth;
      }
    );
  }

  userCall () {
    this.userId = this.auth.getUserId();
    this.loading = true;
    this.route.params.subscribe(
      (params) => {
        this.users.getUserById(this.userId).then(
          async (user: User) => {
            this.user = user;
            this.initEmptyForm();
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
    console.log(this.BTCUserHadEuro);
    console.log(this.user.btc);
    console.log(this.cryptoTabPrice[0]);
    this.BCHUserHadEuro = this.cryptoTabPrice[0] * this.user.btc;
    console.log(this.BTCUserHadEuro);
    this.XRPUserHadEuro = this.cryptoTabPrice[1] * this.user.xrp;
    this.ADAUserHadEuro = this.cryptoTabPrice[2] * this.user.ada;
    this.NEOUserHadEuro = this.cryptoTabPrice[3] * this.user.neo;
    this.TRXUserHadEuro = this.cryptoTabPrice[4] * this.user.trx;
    this.EOSUserHadEuro = this.cryptoTabPrice[5] * this.user.eos;
    this.LTCUserHadEuro = this.cryptoTabPrice[6] * this.user.ltc;
    this.BNBUserHadEuro = this.cryptoTabPrice[7] * this.user.bnb;
    this.ETHUserHadEuro = this.cryptoTabPrice[8] * this.user.eth;
    this.BTCUserHadEuro = this.cryptoTabPrice[9] * this.user.btc;
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
  
  // closeSelectCrytpo() {
  //   let cryptoSelectedClose = (document.getElementById('crypto-select') as HTMLFormElement).value;
  //   console.log(cryptoSelectedOpen);
  //   switch (cryptoSelectedOpen) {
  //     case 'btc':
  //       this.isBTCvisible = true;
  //       break;
  //     case 'eth':
  //       this.isETHvisible = true;
  //       break;
  //     case 'bnb':
  //       this.isBNBvisible = true;
  //       break;
  //     case 'ltc':
  //       this.isLTCvisible = true;
  //       break;
  //     case 'eos':
  //       this.isEOSvisible = true;
  //       break;
  //     case 'bch':
  //       this.isBCHvisible = true;
  //       break;
  //     case 'trx':
  //       this.isTRXvisible = true;
  //       break;
  //     case 'neo':
  //       this.isNEOvisible = true;
  //       break;
  //     case 'ada':
  //       this.isADAvisible = true;
  //       break;
  //     case 'xrp':
  //       this.isXRPvisible = true;
  //       break;
  //   }
  // }

  OpenSelectCrytpo() {
    let cryptoSelectedOpen = (document.getElementById('crypto-select') as HTMLFormElement).value;
    console.log(cryptoSelectedOpen);
    switch (cryptoSelectedOpen) {
      case 'btc':
        this.isBTCvisible = true;
        break;
      case 'eth':
        this.isETHvisible = true;
        break;
      case 'bnb':
        this.isBNBvisible = true;
        break;
      case 'ltc':
        this.isLTCvisible = true;
        break;
      case 'eos':
        this.isEOSvisible = true;
        break;
      case 'bch':
        this.isBCHvisible = true;
        break;
      case 'trx':
        this.isTRXvisible = true;
        break;
      case 'neo':
        this.isNEOvisible = true;
        break;
      case 'ada':
        this.isADAvisible = true;
        break;
      case 'xrp':
        this.isXRPvisible = true;
        break;
    }
  }

  initEmptyForm() {
    this.userForm = this.formBuilder.group({
      montantDepose: [0],
      btc: [0],
      eth: [0],
      bnb: [0],
      ltc: [0],
      eos: [0],
      bch: [0],
      trx: [0],
      neo: [0],
      ada: [0],
      xrp: [0],
    });
  }

  BuyBTCCrytpo() {
    this.loadingSellCrypto = true;
    this.BTCSelectedBuy = this.userForm.get('btc').value;
    let BTCSelectedBuyResult = this.userForm.get('btc').value / (this.cryptoTabPrice[9]);
    this.cryptoTabBuy.push(BTCSelectedBuyResult);

    this.ETHSelectedBuy = this.userForm.get('eth').value
    let ETHSelectedBuyResult = this.userForm.get('eth').value / (this.cryptoTabPrice[8]);
    this.cryptoTabBuy.push(ETHSelectedBuyResult);

    this.BNBSelectedBuy = this.userForm.get('bnb').value
    let BNBSelectedBuyResult = this.userForm.get('bnb').value / (this.cryptoTabPrice[7]);
    this.cryptoTabBuy.push(BNBSelectedBuyResult);

    this.LTCSelectedBuy = this.userForm.get('ltc').value
    let LTCSelectedBuyResult = this.userForm.get('ltc').value / (this.cryptoTabPrice[6]);
    this.cryptoTabBuy.push(LTCSelectedBuyResult);

    this.EOSSelectedBuy = this.userForm.get('eos').value
    let EOSSelectedBuyResult = this.userForm.get('eos').value / (this.cryptoTabPrice[5]);
    this.cryptoTabBuy.push(EOSSelectedBuyResult);

    this.BCHSelectedBuy = this.userForm.get('bch').value
    let BCHSelectedBuyResult = this.userForm.get('bch').value / (this.cryptoTabPrice[0]);
    this.cryptoTabBuy.push(BCHSelectedBuyResult);

    this.TRXSelectedBuy = this.userForm.get('trx').value
    let TRXSelectedBuyResult = this.userForm.get('trx').value / (this.cryptoTabPrice[4]);
    this.cryptoTabBuy.push(TRXSelectedBuyResult);

    this.NEOSelectedBuy = this.userForm.get('neo').value
    let NEOSelectedBuyResult = this.userForm.get('neo').value / (this.cryptoTabPrice[3]);
    this.cryptoTabBuy.push(NEOSelectedBuyResult);

    this.ADASelectedBuy = this.userForm.get('ada').value
    let ADASelectedBuyResult = this.userForm.get('ada').value / (this.cryptoTabPrice[2]);
    this.cryptoTabBuy.push(ADASelectedBuyResult);

    this.XRPSelectedBuy = this.userForm.get('xrp').value
    let XRPSelectedBuyResult = this.userForm.get('xrp').value / (+this.cryptoTabPrice[1]);
    this.cryptoTabBuy.push(XRPSelectedBuyResult);
    
    if (this.user.btc < this.cryptoTabBuy[0]
    || this.user.eth < this.cryptoTabBuy[1]
    || this.user.ltc < this.cryptoTabBuy[3]
    || this.user.bnb < this.cryptoTabBuy[2]
    || this.user.eos < this.cryptoTabBuy[4]
    || this.user.bch < this.cryptoTabBuy[5]
    || this.user.trx < this.cryptoTabBuy[6]
    || this.user.neo < this.cryptoTabBuy[7]
    || this.user.ada < this.cryptoTabBuy[8]
    || this.user.xrp < this.cryptoTabBuy[9]) {
      this.loadingSellCrypto = false
    } else {
      this.loadingSellCrypto = true;
    }

    this.tableIsVisible = true;
}

onClose() {
  this.tableIsVisible = false;
}

onSubmit() {
    this.loading = true;
    const newUser = new User();
    newUser.btc = this.user.btc - this.cryptoTabBuy[0];
    newUser.eth = this.user.eth - this.cryptoTabBuy[1];
    newUser.bnb = this.user.bnb - this.cryptoTabBuy[2];
    newUser.ltc = this.user.ltc - this.cryptoTabBuy[3];
    newUser.eos = this.user.eos - this.cryptoTabBuy[4];
    newUser.bch = this.user.bch - this.cryptoTabBuy[5];
    newUser.trx = this.user.trx - this.cryptoTabBuy[6];
    newUser.neo = this.user.neo - this.cryptoTabBuy[7];
    newUser.ada = this.user.ada - this.cryptoTabBuy[8];
    newUser.xrp = this.user.xrp - this.cryptoTabBuy[9];
    newUser.montantDepose = this.user.montantDepose
    - this.userForm.get('btc').value
    - this.userForm.get('eth').value
    - this.userForm.get('bnb').value
    - this.userForm.get('ltc').value
    - this.userForm.get('eos').value
    - this.userForm.get('bch').value
    - this.userForm.get('trx').value
    - this.userForm.get('neo').value
    - this.userForm.get('ada').value
    - this.userForm.get('xrp').value;
    newUser.id = this.auth.getUserId();
    console.log(newUser);
    this.users.updateUserInvest(this.user.id, newUser).then(
      (response) => {
        console.log(response);
        this.loading = false;
        this.router.navigate(['profil']);
      }
    ).catch(
      (error) => {
        console.error(error);
        this.loading = false;
        this.errorMsg = error.message;
      }
    );
  }

  onClickCrypto(cryptoName: string) {
    this.router.navigate(['crypto', cryptoName]);
  }

  onBack() {
    this.router.navigate(['/cryptos']);
  }

  sellAllCryptos() {
    this.loading = true;
    const newUser = new User();
    newUser.btc = 0;
    newUser.eth = 0;
    newUser.bnb = 0;
    newUser.ltc = 0;
    newUser.eos = 0;
    newUser.bch = 0;
    newUser.trx = 0;
    newUser.neo = 0;
    newUser.ada = 0;
    newUser.xrp = 0;
    newUser.montantDepose = 0
    newUser.id = this.auth.getUserId();
    console.log(newUser);
    this.users.updateUserInvest(this.user.id, newUser).then(
      (response) => {
        console.log(response);
        this.loading = false;
        this.router.navigate(['profil']);
      }
    ).catch(
      (error) => {
        console.error(error);
        this.loading = false;
        this.errorMsg = error.message;
      }
    );
  }

  onInvest() {
    this.router.navigate(['invest']);
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