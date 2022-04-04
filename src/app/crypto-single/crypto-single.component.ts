import { Component, OnInit } from '@angular/core';
import { Crypto } from '../models/Crypto.model';
import { CryptosService } from '../_services/cryptos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChartDataset ,ChartType, Chart, ChartOptions } from 'chart.js';
import { DatePipe } from '@angular/common';
// import { BaseChartDirective } from 'ng2-charts';
//import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-crypto-single',
  templateUrl: './crypto-single.component.html',
  styleUrls: ['./crypto-single.component.scss'],
})
export class CryptoSingleComponent implements OnInit {

  loading: boolean;
  cryptoSub: Subscription;
  cryptos: Crypto[];
  userId: string;
  errorMsg: string;

  cryptoTabDate : Date[] = [];
  cryptoTabPrice : number[] = [];
  cryptoTabVolume : number[] = [];
  cryptoTabChange : number[] = [];
  cryptoTabName : string[] = [];
  cryptoTabVolumeDay : number[] = [];
  cryptoTabHighDay : number[] = [];
  cryptoTabLowDay : number[] = [];
  cryptoTabimageUrl : string[] = [];
  cryptoTabtopTierVolume24Hour : number[] = [];
  cryptoTabMKTCAP : number[] = [];
  // cryptoTabPrice : number[] = [];
  // cryptoTabPrice : number[] = [];

  CompleteNameCrypto: string;

  // ChartType  : ChartType = 'bar'
  // dataName: Date[] = this.cryptoTabDate;
  // labelsDate: Number[] = this.cryptoTabPrice;


  public ChartType: ChartType = 'line';
  public labelsDate: String[] = [];
  public dataPrice: ChartDataset[] = [
    { data: [], label: 'Prix (€)', borderColor: 'rgb(75, 192, 192)', backgroundColor:'rgb(75, 192, 192)', type:'line' },
    { data: [], label: 'Volume (€)',hidden: true, borderColor: 'rgb(238, 174, 0)', backgroundColor:'rgb(238, 174, 0)', type:'line'},
    { data: [], label: 'Top Tier Volume (€)',hidden: true, borderColor: 'rgb(238, 0, 40)', backgroundColor:'rgb(238, 0, 40)', type:'line'},
    { data: [], label: 'Market Cap (€) ',hidden: true, borderColor: 'rgb(0, 238, 32)', backgroundColor:'rgb(0, 238, 32)', type:'line'},
    { data: [], label: 'Change (%)',hidden: true, borderColor: 'rgb(158, 33, 189)', backgroundColor:'rgb(158, 33, 189)', type:'line'},
    // { data: [], label: 'Volume', borderColor: 'rgb(238, 174, 0)', backgroundColor:'rgb(238, 174, 0)', type:'line'},
  ];

  public options: ChartOptions = {
  };

  constructor(private cryptoservice: CryptosService,
              private route: ActivatedRoute,
              // private auth: AuthService,
              private router: Router,
              public datepipe: DatePipe) { }

  ngOnInit() {

    this.loading = true;
    this.route.params.subscribe(
      (params) => {
        this.cryptoservice.getCryptosByName(params['cryptoName']).then(
          (cryptos: Crypto[]) => {
            this.cryptos = cryptos;
            this.loading = false;
            console.log(this.cryptos);
            console.log(this.cryptos["price"])
            for(var i = 0; i < cryptos.length; i++) {
              this.cryptoTabPrice.push(+this.cryptos[i]["price"]);
              this.cryptoTabVolume.push(this.cryptos[i]["totalVolume24H"]);
              this.cryptoTabChange.push(this.cryptos[i]["changeHour"]);
              this.cryptoTabtopTierVolume24Hour.push(this.cryptos[i]["topTierVolume24Hour"]);
              this.cryptoTabMKTCAP.push(this.cryptos[i]["MKTCAP"]);
              this.cryptoTabName.push(this.cryptos[i]["cryptoName"]);
              this.cryptoTabVolumeDay.push(this.cryptos[i]["VolumeDay"]);
              this.cryptoTabHighDay.push(this.cryptos[i]["HighDay"]);
              this.cryptoTabLowDay.push(this.cryptos[i]["LowDay"]);
              this.cryptoTabimageUrl.push(this.cryptos[i]["imageUrl"]);
              this.cryptoTabDate.push(this.cryptos[i]["date"]);
            }
            console.log(this.cryptoTabPrice);

            switch (this.cryptoTabName[this.cryptoTabName.length - 1]) {
              case 'BTC':
                this.CompleteNameCrypto = "Bitcoin";
                break;
              case 'ETH':
                this.CompleteNameCrypto = "Etherum";
                break;
              case 'BNB':
                this.CompleteNameCrypto = "Binance Coin";
                break;
              case 'LTC':
                this.CompleteNameCrypto = "Litecoin";
                break;
              case 'EOS':
                this.CompleteNameCrypto = "Eos";
                break;
              case 'BCH':
                this.CompleteNameCrypto = "Bitcoin Cash";
                break;
              case 'TRX':
                this.CompleteNameCrypto = "Tron";
                break;
              case 'NEO':
                this.CompleteNameCrypto = "Neo Etherum Chinois";
                break;
              case 'ADA':
                this.CompleteNameCrypto = "Cardano";
                break;
              case 'XRP':
                this.CompleteNameCrypto = "XRP";
                break;
              default:
                this.CompleteNameCrypto = "";
            }

    
            for (var cryptoDate of this.cryptoTabDate) {
              var date = new Date(cryptoDate);
              date.toISOString().substring(0, 10);
              this.labelsDate.push(date.toISOString().substring(0, 10) + ' ' + date.toISOString().substring(11, 16));
            }
            for (var cryptoPrice of this.cryptoTabPrice) {
              this.dataPrice[0]['data'].push(cryptoPrice);
            }
            for (var cryptoVolume of this.cryptoTabVolume) {
              this.dataPrice[1]['data'].push(cryptoVolume);
            }
            for (var cryptoChange of this.cryptoTabChange) {
              this.dataPrice[4]['data'].push(cryptoChange);
            }
            for (var cryptoTopTierVolume24Hour of this.cryptoTabtopTierVolume24Hour) {
              this.dataPrice[2]['data'].push(cryptoTopTierVolume24Hour);
            }
            for (var cryptoMKTCAP of this.cryptoTabPrice) {
              this.dataPrice[3]['data'].push(cryptoMKTCAP);
            }

          }
        );
      }
    );



  }


ngAfterViewInit() {
  const canvas = <HTMLCanvasElement> document.getElementById('myChart');
  const ctx = canvas.getContext('2d');

  new Chart(ctx, {
    type: 'line',
    data: {
        datasets: [{
            label: 'Current Vallue',
            data: [0, 20, 40, 50],
            backgroundColor: "rgb(115 185 243 / 65%)",
            borderColor: "#007ee7",
            fill: true,
        },
        {
          label: 'Invested Amount',
          data: [0, 20, 40, 60, 80],
          backgroundColor: "#47a0e8",
          borderColor: "#007ee7",
          fill: true,
      }],
        labels: ['January 2019', 'February 2019', 'March 2019', 'April 2019']
    },
  });
}
}

function newDate(cryptoDate: Date) {
  throw new Error('Function not implemented.');
}

