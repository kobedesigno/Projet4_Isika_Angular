import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Crypto } from '../models/Crypto.model';
import { HttpClient } from '@angular/common/http';
// import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CryptosService {

  cryptos$ = new Subject<Crypto[]>();

  constructor(private http: HttpClient,
              //private auth: AuthService
              ) { }

  getCryptos() {
    this.http.get('https://isikaprojet4-cryptoapp-n-s.herokuapp.com/api/cryptos').subscribe(
      (cryptos: Crypto[]) => {
        this.cryptos$.next(cryptos);
      },
      (error) => {
        this.cryptos$.next([]);
        console.error(error);
      }
    );
  }
  getCryptosByName(cryptoName: string) {
    return new Promise((resolve, reject) => {
      this.http.get('https://isikaprojet4-cryptoapp-n-s.herokuapp.com/api/cryptos/cryptoName/' + cryptoName).subscribe(
      (cryptos: Crypto[]) => {
        resolve(cryptos);
      },
      (error) => {
        reject(error);
      }
    );
    })
    
  }
  getCryptosByNameDate(cryptoName: string, cryptoDate: Date) {
    this.http.get('https://isikaprojet4-cryptoapp-n-s.herokuapp.com/api/cryptos/dateName/'+ cryptoDate +'/' + cryptoName).subscribe(
      (cryptos: Crypto[]) => {
        this.cryptos$.next(cryptos);
      },
      (error) => {
        this.cryptos$.next([]);
        console.error(error);
      }
    );
  }
}
