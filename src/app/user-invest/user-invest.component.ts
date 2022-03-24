import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../models/User.model';
import { AuthService } from '../_services/auth.service';
import { CryptosService } from '../_services/cryptos.service';
import { UsersService } from '../_services/users.service';

@Component({
  selector: 'app-invest-form',
  templateUrl: './invest-form.component.html',
  styleUrls: ['./invest-form.component.scss']
})
export class InvestFormComponent implements OnInit {

  userForm: FormGroup;
  loading: boolean;
  user: User;
  userId: number;
  cryptoSub: Subscription;
  cryptos: Crypto[];
  errorMsg: string;
  imagePreview: string;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private crypto: CryptosService,
              private users: UsersService,
              private auth: AuthService) { }

  ngOnInit() {
    this.userId = this.auth.getUserId();
    this.loading = true;
    this.route.params.subscribe(
      (params) => {
          this.users.getUserById(this.userId).then(
            (user: User) => {
              this.user = user;
              this.initModifyForm(user);
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
        //this.cryptos = cryptos;
        this.loading = false;
        this.errorMsg = null;
      },
      (error) => {
        this.errorMsg = JSON.stringify(error);
        this.loading = false;
      }
    );
    this.crypto.getCryptos();
    console.log(crytpos);
  }

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
    newUser.btc = this.userForm.get('BTC').value;
    newUser.eth = this.userForm.get('ETH').value;
    newUser.bnb = this.userForm.get('BNB').value;
    newUser.ltc = this.userForm.get('LTC').value;
    newUser.eos = this.userForm.get('EOS').value;
    newUser.bch = this.userForm.get('BCH').value;
    newUser.trx = this.userForm.get('TRX').value;
    newUser.neo = this.userForm.get('NEO').value;
    newUser.ada = this.userForm.get('ADA').value;
    newUser.xrp = this.userForm.get('XRP').value;
    newUser.montantDepose = this.userForm.get("montantDepose").value;
    this.users.updateUserInvest(this.user.id, newUser).then(
      (response: { message: string }) => {
        console.log(response.message);
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
function crytpos(crytpos: any) {
  throw new Error('Function not implemented.');
}

