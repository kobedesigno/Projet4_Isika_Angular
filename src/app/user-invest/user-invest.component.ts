import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../models/User.model';
import { AuthService } from '../_services/auth.service';
import { CryptosService } from '../_services/cryptos.service';
import { UsersService } from '../_services/users.service';
import { Crypto } from '../models/Crypto.model';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-invest',
  templateUrl: './user-invest.component.html',
  styleUrls: ['./user-invest.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class UserInvestComponent implements OnInit {

  userForm: FormGroup;
  loading: boolean;
  user: User;
  userId: number;
  cryptoSub: Subscription;
  cryptos: Crypto[];
  errorMsg: string;
  
  cryptoTabPrice: string[] = [];
  
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
  // btcObject: Object[];
  // ethObject: Object[];
  // bnbTab: Object[];
  // ltcTab: Object[];
  // eosTab: Object[];
  // bchObject: any;
  // trxTab: Object[];
  // neoTab: Object[];
  // adaTab: Object[];
  // xrpTab: Object[];

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private crypto: CryptosService,
              private users: UsersService,
              private auth: AuthService,
              config: NgbModalConfig, 
              private modalService: NgbModal) { 

    config.backdrop = 'static';
    config.keyboard = false;
  }

  open(content) {
    this.modalService.open(content);
  }

  ngOnInit() {
    this.userId = this.auth.getUserId();
    this.loading = true;
    this.route.params.subscribe(
      (params) => {
          this.users.getUserById(this.userId).then(
            (user: User) => {
              this.user = user;
              this.initEmptyForm()
              //this.initModifyForm(user);
              this.loading = false;
            }
          ).catch(
            (error) => {
              this.errorMsg = JSON.stringify(error);
            }
          );
      }
    );
    this.cryptoSub = this.crypto.cryptos$.subscribe(
      (cryptos) => {
        this.cryptos = cryptos;
        console.log(this.cryptos);
      for(var i = 0; i < cryptos.length; i++) {
        switch (this.cryptos[i]["cryptoName"]) {
          case 'BCH':
          case 'XRP':
          case 'ADA':
          case 'NEO':
          case 'TRX':
          case 'NEO':
          case 'EOS':
          case 'LTC':
          case 'BNB':
          case 'ETH':
          case 'BTC':
          case 'ADA':
            this.cryptoTabPrice.push(cryptos[i]["price"]);
            break;
        }
      };
      console.log(this.cryptoTabPrice);
        this.loading = false;
        this.errorMsg = null;
      },
      (error) => {
        this.errorMsg = JSON.stringify(error);
        this.loading = false;
      }
    );
    this.crypto.getCryptos();
    console.log(this.cryptoTabBuy);
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

  BuyBTCCrytpo() {
   
      this.BTCSelectedBuy = this.userForm.get('btc').value;
      let BTCSelectedBuyResult = this.userForm.get('btc').value / (+this.cryptoTabPrice[0]);
      this.cryptoTabBuy.push(BTCSelectedBuyResult);

      this.ETHSelectedBuy = this.userForm.get('eth').value
      let ETHSelectedBuyResult = this.userForm.get('eth').value / (+this.cryptoTabPrice[1]);
      this.cryptoTabBuy.push(ETHSelectedBuyResult);

      this.BNBSelectedBuy = this.userForm.get('bnb').value
      let BNBSelectedBuyResult = this.userForm.get('bnb').value / (+this.cryptoTabPrice[2]);
      this.cryptoTabBuy.push(BNBSelectedBuyResult);

      this.LTCSelectedBuy = this.userForm.get('ltc').value
      let LTCSelectedBuyResult = this.userForm.get('ltc').value / (+this.cryptoTabPrice[3]);
      this.cryptoTabBuy.push(LTCSelectedBuyResult);

      this.EOSSelectedBuy = this.userForm.get('eos').value
      let EOSSelectedBuyResult = this.userForm.get('eos').value / (+this.cryptoTabPrice[4]);
      this.cryptoTabBuy.push(EOSSelectedBuyResult);

      this.BCHSelectedBuy = this.userForm.get('bch').value
      let BCHSelectedBuyResult = this.userForm.get('bch').value / (+this.cryptoTabPrice[5]);
      this.cryptoTabBuy.push(BCHSelectedBuyResult);

      this.TRXSelectedBuy = this.userForm.get('trx').value
      let TRXSelectedBuyResult = this.userForm.get('trx').value / (+this.cryptoTabPrice[6]);
      this.cryptoTabBuy.push(TRXSelectedBuyResult);

      this.NEOSelectedBuy = this.userForm.get('neo').value
      let NEOSelectedBuyResult = this.userForm.get('neo').value / (+this.cryptoTabPrice[7]);
      this.cryptoTabBuy.push(NEOSelectedBuyResult);

      this.ADASelectedBuy = this.userForm.get('ada').value
      let ADASelectedBuyResult = this.userForm.get('ada').value / (+this.cryptoTabPrice[8]);
      this.cryptoTabBuy.push(ADASelectedBuyResult);

      this.XRPSelectedBuy = this.userForm.get('xrp').value
      let XRPSelectedBuyResult = this.userForm.get('xrp').value / (+this.cryptoTabPrice[9]);
      this.cryptoTabBuy.push(XRPSelectedBuyResult);
  }

  // }

  initModifyForm(user: User) {
    this.userForm = this.formBuilder.group({
      montantDepose: [this.user.montantDepose],
      btc: [this.user.btc],
      eth: [this.user.eth],
      bnb: [this.user.bnb],
      ltc: [this.user.ltc],
      eos: [this.user.eos],
      bch: [this.user.bch],
      trx: [this.user.trx],
      neo: [this.user.neo],
      ada: [this.user.ada],
      xrp: [this.user.xrp],
      //heatValue: [{value: this.sauce.heat, disabled: true}]
    });
  }

  onSubmit() {
    this.loading = true;
    const newUser = new User();
    console.log(this.BTCSelectedBuyResult);
    console.log(this.cryptoTabBuy[0]);
    console.log(this.cryptoTabBuy[1]);
    console.log(this.ETHSelectedBuyResult);
    console.log(this.BNBSelectedBuyResult);
    console.log(newUser.ltc);
    console.log( newUser.eos);
    console.log(this.user.btc)


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

