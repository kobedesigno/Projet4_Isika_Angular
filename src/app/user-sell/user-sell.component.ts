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

@Component({
  selector: 'app-user-sell',
  templateUrl: './user-sell.component.html',
  styleUrls: ['./user-sell.component.scss']
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

  afterSelectCrypto:boolean;

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
  messageError: string;
  buttonSellAll: boolean;
  BooleanSellAll: boolean;

  constructor(private users: UsersService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private auth: AuthService,
              private crypto: CryptosService,
              private router: Router) {}

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
  
  

  OpenSelectCrytpo() {
    let cryptoSelectedOpen = (document.getElementById('crypto-select') as HTMLFormElement).value;
    console.log(cryptoSelectedOpen);
    switch (cryptoSelectedOpen) {
      case 'btc':
        this.afterSelectCrypto = true;
        this.isBTCvisible = true;
        this.buttonSellAll = false;
        break;
      case 'eth':
        this.afterSelectCrypto = true;
        this.isETHvisible = true;
        this.buttonSellAll = false;
        break;
      case 'bnb':
        this.afterSelectCrypto = true;
        this.isBNBvisible = true;
        this.buttonSellAll = false;
        break;
      case 'ltc':
        this.afterSelectCrypto = true;
        this.isLTCvisible = true;
        this.buttonSellAll = false;
        break;
      case 'eos':
        this.afterSelectCrypto = true;
        this.isEOSvisible = true;
        this.buttonSellAll = false;
        break;
      case 'bch':
        this.afterSelectCrypto = true;
        this.isBCHvisible = true;
        this.buttonSellAll = false;
        break;
      case 'trx':
        this.afterSelectCrypto = true;
        this.isTRXvisible = true;
        this.buttonSellAll = false;
        break;
      case 'neo':
        this.afterSelectCrypto = true;
        this.isNEOvisible = true;
        this.buttonSellAll = false;
        break;
      case 'ada':
        this.afterSelectCrypto = true;
        this.isADAvisible = true;
        this.buttonSellAll = false;
        break;
      case 'xrp':
        this.afterSelectCrypto = true;
        this.isXRPvisible = true;
        this.buttonSellAll = false;
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
        this.buttonSellAll = false;
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
    this.BooleanSellAll = false;
    if (this.user.btc < this.cryptoTabBuy[0]) {
      this.loadingSellCrypto = false;
      this.BooleanSellAll = true;
      this.messageError = "Le montant de BTC que vous voulez vendre est supérieur à celui que vous détenez!"
    } else if (this.user.eth < this.cryptoTabBuy[1]) {
      this.loadingSellCrypto = false;
      this.BooleanSellAll = true;
      this.messageError = "Le montant de ETH que vous voulez vendre est supérieur à celui que vous détenez!"
    } else if (this.user.ltc < this.cryptoTabBuy[3]) {
      this.loadingSellCrypto = false;
      this.BooleanSellAll = true;
      this.messageError = "Le montant de LTC que vous voulez vendre est supérieur à celui que vous détenez!"
    } else if (this.user.bnb < this.cryptoTabBuy[2]) {
      this.loadingSellCrypto = false;
      this.BooleanSellAll = true;
      this.messageError = "Le montant de BNB que vous voulez vendre est supérieur à celui que vous détenez!"
    } else if (this.user.eos < this.cryptoTabBuy[4]) {
      this.loadingSellCrypto = false;
      this.BooleanSellAll = true;
      this.messageError = "Le montant de EOS que vous voulez vendre est supérieur à celui que vous détenez!"
    } else if (this.user.bch < this.cryptoTabBuy[5]) {
      this.loadingSellCrypto = false;
      this.BooleanSellAll = true;
      this.messageError = "Le montant de BCH que vous voulez vendre est supérieur à celui que vous détenez!"
    } else if (this.user.trx < this.cryptoTabBuy[6]) {
      this.loadingSellCrypto = false;
      this.BooleanSellAll = true;
      this.messageError = "Le montant de TRX que vous voulez vendre est supérieur à celui que vous détenez!"
    } else if (this.user.neo < this.cryptoTabBuy[7]) {
      this.loadingSellCrypto = false;
      this.BooleanSellAll = true;
      this.messageError = "Le montant de NEO que vous voulez vendre est supérieure à celui que vous détenez!"
    } else if (this.user.ada < this.cryptoTabBuy[8]) {
      this.loadingSellCrypto = false;
      this.BooleanSellAll = true;
      this.messageError = "Le montant de ADA que vous voulez vendre est supérieur à celui que vous détenez!"
    } else if (this.user.xrp < this.cryptoTabBuy[9]) {
      this.loadingSellCrypto = false;
      this.BooleanSellAll = true;
      this.messageError = "Le montant de XRP que vous voulez vendre est supérieur à celui que vous détenez!"
    } else {
      this.loadingSellCrypto = true
      this.BooleanSellAll = true;
    }

    this.tableIsVisible = true;
    this.buttonSellAll = false;
}

sellAllTab() {
  
    this.loadingSellCrypto = true;
    this.cryptoTabBuy = [];
    this.BTCSelectedBuy = this.user.btc * (this.cryptoTabPrice[9]);
    let BTCSelectedBuyResult = this.user.btc;
    this.cryptoTabBuy.push(BTCSelectedBuyResult);

    this.ETHSelectedBuy = this.user.eth * (this.cryptoTabPrice[8]);
    let ETHSelectedBuyResult = this.user.eth;
    this.cryptoTabBuy.push(ETHSelectedBuyResult);

    this.BNBSelectedBuy = this.user.bnb * (this.cryptoTabPrice[7]);
    let BNBSelectedBuyResult = this.user.bnb;
    this.cryptoTabBuy.push(BNBSelectedBuyResult);

    this.LTCSelectedBuy = this.user.ltc * (this.cryptoTabPrice[6]);
    let LTCSelectedBuyResult = this.user.ltc;
    this.cryptoTabBuy.push(LTCSelectedBuyResult);

    this.EOSSelectedBuy = this.user.eos * (this.cryptoTabPrice[5]);
    let EOSSelectedBuyResult = this.user.eos;
    this.cryptoTabBuy.push(EOSSelectedBuyResult);

    this.BCHSelectedBuy = this.user.bch * (this.cryptoTabPrice[0]);
    let BCHSelectedBuyResult = this.user.bch;
    this.cryptoTabBuy.push(BCHSelectedBuyResult);

    this.TRXSelectedBuy = this.user.trx * (this.cryptoTabPrice[4]);
    let TRXSelectedBuyResult = this.user.trx;
    this.cryptoTabBuy.push(TRXSelectedBuyResult);

    this.NEOSelectedBuy = this.user.neo * (this.cryptoTabPrice[3]);
    let NEOSelectedBuyResult = this.user.neo;
    this.cryptoTabBuy.push(NEOSelectedBuyResult);

    this.ADASelectedBuy = (this.cryptoTabPrice[2]) * this.user.ada
    let ADASelectedBuyResult = this.user.ada; 
    this.cryptoTabBuy.push(ADASelectedBuyResult);

    this.XRPSelectedBuy = (this.cryptoTabPrice[1]) * this.user.xrp;
    let XRPSelectedBuyResult = this.user.xrp;
    this.cryptoTabBuy.push(XRPSelectedBuyResult);

    this.tableIsVisible = true;
    this.buttonSellAll = true;
    this.afterSelectCrypto = true;

    this.BooleanSellAll = false;

  
}

onClose() {
  this.tableIsVisible = false;
  this.buttonSellAll = false;
  this.BooleanSellAll = false;
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