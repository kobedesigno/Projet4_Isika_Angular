import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

const AUTH_API = 'https://isikaprojet4-cryptoapp-s-s.herokuapp.com/api/auth/';
//const AUTH_API = 'http://localhost:5000/api/auth/'

// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// };

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   constructor(private http: HttpClient) { }

//   login(username: string, password: string): Observable<any> {
//     return this.http.post(AUTH_API + 'login', {
//       username,
//       password
//     }, httpOptions);
//   }

//   register(username: string, email: string, password: string): Observable<any> {
//     return this.http.post(AUTH_API + 'signup', {
//       username,
//       email,
//       password
//     }, httpOptions);
//   }
//}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth$ = new BehaviorSubject<boolean>(false);
  private authToken: string;
  private userId: number;

  constructor(private http: HttpClient,
              private router: Router) {}

  register(email: string, password: string, username: string) {
    return new Promise((resolve, reject) => {
      this.http.post(AUTH_API + 'signup', {email: email, password: password, username: username}).subscribe(
        (response: { message: string }) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  getToken() {
    return this.authToken;
  }

  getUserId() {
    return this.userId;
  }

  login(username: string, password: string) {
    return new Promise<void>((resolve, reject) => {
      this.http.post(AUTH_API + 'login', {username: username, password: password}).subscribe(
        (response: {id: number, acessToken: string}) => {
          this.userId = response.id;
          console.log(this.userId);
          this.authToken = response.acessToken;
          this.isAuth$.next(true);
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  logout() {
    this.authToken = null;
    this.userId = null;
    this.isAuth$.next(false);
    this.router.navigate(['login']);
  }

}

