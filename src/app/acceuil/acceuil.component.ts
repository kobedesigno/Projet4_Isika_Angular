import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CryptosService } from '../_services/cryptos.service';
import { Crypto } from '../models/Crypto.model';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.scss']
})
export class AcceuilComponent implements OnInit {

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
  ];

  cryptoTabDescription = [
    "Bitcoin Cash - Une version améliorée du Bitcoin ? Bitcoin cash est une crypto-monnaie créée en août 2017, suite à un fork de Bitcoin. La principale amélioration est l'augmentation de la taille des blocs, ce qui permet de traiter un plus grand nombre de transactions par seconde et donc de proposer des transactions plus rapides et à moindre frais.",
    "Ripple - La monnaie numérique des banques. Ripple est une technologie qui agit à la fois comme une crypto-monnaie et comme un réseau de paiement numérique pour les transactions financières. Ripple est plus connu pour son protocole de paiement numérique que pour son token, le XRP. Ripple permet d'échanger de l'argent sous n'importe quelle forme, que ce soit en euros, dollars ou bitcoins.",
    "Cardano - Le token de 3ème génération. Bitcoin et Ethereum sont respectivement des tokens de première et seconde génération. Dans cette configuration, Cardano se présente comme un token de troisième génération, qui permettrait de corriger les problèmes de montée en charge du Bitcoin grâce à une plateforme contractuelle intelligente.",
    "NEO - L'Ethereum chinois. Le projet est lancé en 2014 sous le nom d’AntShares, c’est la première blockchain publique et open-source chinoise. Le projet a levé 8.820 BTC en réalisant 2 ICOs. L'objectif de NEO est de lier l’économie réelle et la blockchain en se rattachant à certains procédés tels que la Digital Identity, qui permet de vérifier l’identité des utilisateurs et de se plier aux mêmes règles que dans la vie réelle.",
    "Tron - La blockchain du divertissement. Tron est une plateforme décentralisée basée sur une blockchain qui vise à construire un système de divertissement avec du contenu numérique mondial et gratuit. Le tout repose sur une technologie de stockage distribuée qui permet un partage facile et attractif du contenu numérique.",
    "EOS - De nouveaux horizons pour les dApps. EOS est un système d'exploitation décentralisé basé sur une blockchain. Le projet est conçu pour créer, héberger et prendre en charge des applications autonomes décentralisées (dApps). Celles-ci peuvent être commerciales ou personnelles, et fonctionnent d'une façon similaire aux applications web.",
    "Litecoin - L'argent numérique.Lancée en 2011 par Charlie Lee, Litecoin est une cryptomonnaie alternative basée sur le modèle de Bitcoin. Litecoin repose sur un réseau de paiement mondial, open source et décentralisé. Si Bitcoin est souvent comparé à l'or numérique, Litecoin est, quant à lui, comparé à l'argent numérique.",
    "Binance Coin - Le rouleau compresseur chinois qui surperforme en 2019. Le BNB (ou Binance Coin) est le token de l'exchange éponyme : Binance. C’est la crypto qui a le moins souffert lors de l’éclatement de la bulle des cryptomonnaies en janvier 2018. Le coin est en forte hausse depuis janvier 2019, ce qui s'explique principalement par le succès de la plateforme Binance qui est le leader mondial.",
    "Ethereum - La machine à ICO. Ethereum est l'une des crypto-monnaies les plus populaires après Bitcoin. Elle fait beaucoup parler d'elle depuis quelques années car elle s'est rendue indispensable pour de nombreux autres projets au travers des levées de fonds en cryptomonnaies : les ICO.",
    "Bitcoin - Le roi de la crypto-jungle. Bitcoin est une monnaie numérique créée en 2009 par le mystérieux Satoshi Nakamoto, dont on ignore encore aujourd'hui la véritable identité. Bitcoin est une monnaie décentralisée, contrairement aux monnaies émises par les banques et les gouvernements, qui permet de faire des transactions rapides et avec peu de frais."
  ];

}
