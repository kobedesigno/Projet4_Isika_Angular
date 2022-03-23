import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/User.model';
import { AuthService } from '../_services/auth.service';
import { UsersService } from '../_services/users.service';

@Component({
  selector: 'app-invest-user',
  templateUrl: './invest-user.component.html',
  styleUrls: ['./invest-user.component.scss']
})
export class InvestUserComponent implements OnInit {

  loading: boolean;
  user: User;
  userId: string;
  errorMessage: string;

  constructor(private users: UsersService,
              private route: ActivatedRoute,
              private auth: AuthService,
              private router: Router) {}

  ngOnInit() {
    this.userId = this.auth.getUserId();
    this.loading = true;
    this.route.params.subscribe(
      (params) => {
        this.users.getSauceById(params.id).then(
          (user: User) => {
            this.user = user;
            this.loading = false;
          }
        );
      }
    );
    this.userId = this.auth.getUserId();
  }

  onBack() {
    this.router.navigate(['/cryptos']);
  }

  onModify() {
    this.router.navigate(['/invest-user', this.user._id]);
  }

  onDelete() {
    this.loading = true;
    this.users.deleteUser(this.user._id).then(
      (response: { message: string }) => {
        console.log(response.message);
        this.loading = false;
        this.router.navigate(['/cryptos']);
      }
    ).catch(
      (error) => {
        this.loading = false;
        this.errorMessage = error.message;
        console.error(error);
      }
    );
  }
}
