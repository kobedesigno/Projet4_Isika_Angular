import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../models/User.model';
import { AuthService } from '../_services/auth.service';
import { CryptosService } from '../_services/cryptos.service';
import { UsersService } from '../_services/users.service';
import { Crypto } from '../models/Crypto.model';


@Component({
  selector: 'app-user-invest',
  templateUrl: './user-invest.component.html',
  styleUrls: ['./user-invest.component.scss']
})
export class UserInvestComponent implements OnInit {

  isAuth: boolean;
  authSubscription: Subscription;

  userForm: FormGroup;
  loading: boolean;
  tableIsVisible: boolean;
  user: User;
  userId: number;
  cryptoSub: Subscription;
  cryptos: Crypto[];
  errorMsg: string;
  

  afterSelectCrypto: boolean;
  
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

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private crypto: CryptosService,
              private users: UsersService,
              private auth: AuthService) {}


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
    this.BCHUserHadEuro = this.cryptoTabPrice[0] * this.user.bch;
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

  OpenSelectCrytpo() {
    let cryptoSelectedOpen = (document.getElementById('crypto-select') as HTMLFormElement).value;
    console.log(cryptoSelectedOpen);
    switch (cryptoSelectedOpen) {
      case 'btc':
        this.afterSelectCrypto = true;
        this.isBTCvisible = true;
        break;
      case 'eth':
        this.afterSelectCrypto = true;
        this.isETHvisible = true;
        break;
      case 'bnb':
        this.afterSelectCrypto = true;
        this.isBNBvisible = true;
        break;
      case 'ltc':
        this.afterSelectCrypto = true;
        this.isLTCvisible = true;
        break;
      case 'eos':
        this.afterSelectCrypto = true;
        this.isEOSvisible = true;
        break;
      case 'bch':
        this.afterSelectCrypto = true;
        this.isBCHvisible = true;
        break;
      case 'trx':
        this.afterSelectCrypto = true;
        this.isTRXvisible = true;
        break;
      case 'neo':
        this.afterSelectCrypto = true;
        this.isNEOvisible = true;
        break;
      case 'ada':
        this.afterSelectCrypto = true;
        this.isADAvisible = true;
        break;
      case 'xrp':
        this.afterSelectCrypto = true;
        this.isXRPvisible = true;
        break;
      default:
        this.afterSelectCrypto = false;
    }
  }

  closeBTC() {
    this.isBTCvisible = false;
    this.BTCSelectedBuy = 0;
    this.cryptoTabBuy[0] = 0;
    this.userForm.patchValue({
      btc: 0
    });
    this.closeTabisVisible();
  }
  closeETH() {
    this.isETHvisible = false;
    this.ETHSelectedBuy = 0;
    this.cryptoTabBuy[1] = 0;
    this.userForm.patchValue({
      eth: 0
    });
    this.closeTabisVisible();
  }
  closeBNB() {
    this.isBNBvisible = false;
    this.BNBSelectedBuy = 0;
    this.cryptoTabBuy[2] = 0;
    this.userForm.patchValue({
      bnb: 0
    });
    this.closeTabisVisible();
  }
  closeLTC() {
    this.isLTCvisible = false;
    this.LTCSelectedBuy = 0;
    this.cryptoTabBuy[3] = 0;
    this.userForm.patchValue({
      ltc: 0
    });
    this.closeTabisVisible();
  }
  closeEOS() {
    this.isEOSvisible = false;
    this.EOSSelectedBuy = 0;
    this.cryptoTabBuy[4] = 0;
    this.userForm.patchValue({
      eos: 0
    });
    this.closeTabisVisible();
  }
  closeBCH() {
    this.isBCHvisible = false;
    this.BCHSelectedBuy = 0;
    this.cryptoTabBuy[5] = 0;
    this.userForm.patchValue({
      bch: 0
    });
    this.closeTabisVisible();
  }
  closeTRX() {
    this.isTRXvisible = false;
    this.TRXSelectedBuy = 0;
    this.cryptoTabBuy[6] = 0;
    this.userForm.patchValue({
      trx: 0
    });
    this.closeTabisVisible();
  }
  closeNEO() {
    this.isNEOvisible = false;
    this.NEOSelectedBuy = 0;
    this.cryptoTabBuy[7] = 0;
    this.userForm.patchValue({
      neo: 0
    });
    this.closeTabisVisible();
  }
  closeADA() {
    this.isADAvisible = false;
    this.ADASelectedBuy = 0;
    this.cryptoTabBuy[8] = 0;
    this.userForm.patchValue({
      ada: 0
    });
    this.closeTabisVisible();
  }
  closeXRP() {
    this.isXRPvisible = false;
    this.XRPSelectedBuy = 0;
    this.cryptoTabBuy[9] = 0;
    this.userForm.patchValue({
      xrp: 0
    });
    this.closeTabisVisible();
  }

  closeTabisVisible(){
    if (this.cryptoTabBuy[0] == 0
      && this.cryptoTabBuy[1] == 0
      && this.cryptoTabBuy[2] == 0
      && this.cryptoTabBuy[3] == 0
      && this.cryptoTabBuy[4] == 0
      && this.cryptoTabBuy[5] == 0
      && this.cryptoTabBuy[6] == 0
      && this.cryptoTabBuy[7] == 0
      && this.cryptoTabBuy[8] == 0
      && this.cryptoTabBuy[9] == 0) {
        this.tableIsVisible = false;
      }
  }

  BuyBTCCrytpo() {
   
      this.cryptoTabBuy = [];
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
      let XRPSelectedBuyResult = this.userForm.get('xrp').value / (this.cryptoTabPrice[1]);
      this.cryptoTabBuy.push(XRPSelectedBuyResult);

      this.tableIsVisible = true;
  }

  onClose() {
    this.tableIsVisible = false;
  }


  // Pour initier les valeurs dans les input avec les valeur de l'utilisateur (non utile ?)
  // initModifyForm(user: User) {
  //   this.userForm = this.formBuilder.group({
  //     montantDepose: [this.user.montantDepose],
  //     btc: [this.user.btc],
  //     eth: [this.user.eth],
  //     bnb: [this.user.bnb],
  //     ltc: [this.user.ltc],
  //     eos: [this.user.eos],
  //     bch: [this.user.bch],
  //     trx: [this.user.trx],
  //     neo: [this.user.neo],
  //     ada: [this.user.ada],
  //     xrp: [this.user.xrp],
  //   });
  // }

  onSubmit() {
    this.loading = true;
    const newUser = new User();

    newUser.btc = this.cryptoTabBuy[0] + this.user.btc;
    newUser.eth = this.cryptoTabBuy[1] + this.user.eth;
    newUser.bnb = this.cryptoTabBuy[2] + this.user.bnb;
    newUser.ltc = this.cryptoTabBuy[3] + this.user.ltc;
    newUser.eos = this.cryptoTabBuy[4] + this.user.eos;
    newUser.bch = this.cryptoTabBuy[5] + this.user.bch;
    newUser.trx = this.cryptoTabBuy[6] + this.user.trx;
    newUser.neo = this.cryptoTabBuy[7] + this.user.neo;
    newUser.ada = this.cryptoTabBuy[8] + this.user.ada;
    newUser.xrp = this.cryptoTabBuy[9] + this.user.xrp;
    newUser.montantDepose = this.user.montantDepose
    + this.userForm.get('btc').value
    + this.userForm.get('eth').value
    + this.userForm.get('bnb').value
    + this.userForm.get('ltc').value
    + this.userForm.get('eos').value
    + this.userForm.get('bch').value
    + this.userForm.get('trx').value
    + this.userForm.get('neo').value
    + this.userForm.get('ada').value
    + this.userForm.get('xrp').value;
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
}

