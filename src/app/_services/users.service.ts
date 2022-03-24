import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User.model';

const API_URL = 'https://isikaprojet4-cryptoapp-s-s.herokuapp.com/api/auth/user/';
//const API_URL = 'http://localhost:5000/api/auth/user/';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) { }

  updateUserInvest(id: number, user: User) {
    return new Promise((resolve, reject) => {
      this.http.get(API_URL + id).subscribe(
        (user: User) => {
          resolve(user);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  getUserById(id: number) {
    return new Promise((resolve, reject) => {
      this.http.get(API_URL + id).subscribe(
        (user: User) => {
          resolve(user);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  deleteUser(id: number) {
    return new Promise((resolve, reject) => {
      this.http.delete(API_URL + id).subscribe(
        (response: { message: string }) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

}
