import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  signupForm: FormGroup;
  loading: boolean;
  errorMsg: string;

  constructor(private formBuilder: FormBuilder,
              private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      username: [null, Validators.required]
    });
  }

  onSignup() {
    this.loading = true;
    const email = this.signupForm.get('email').value;
    const password = this.signupForm.get('password').value;
    const username = this.signupForm.get('username').value;
    this.auth.register(email, password, username).then(
      (response: { message: string }) => {
        console.log(response.message);
        this.auth.login(username, password).then(
          () => {
            this.loading = false;
            this.router.navigate(['/profil']);
          }
        ).catch(
          (error) => {
            this.loading = false;
            console.error(error);
            this.errorMsg = error.message;
          }
        );
      }
    ).catch((error) => {
        this.loading = false;
        console.error(error);
        this.errorMsg = error.message;
    });
  }

}



// export class RegisterComponent implements OnInit {
//   form: any = {
//     username: null,
//     email: null,
//     password: null
//   };
//   isSuccessful = false;
//   isSignUpFailed = false;
//   errorMessage = '';

//   constructor(private authService: AuthService) { }

//   ngOnInit(): void {
//   }

//   onSubmit(): void {
//     const { username, email, password } = this.form;

//     this.authService.register(username, email, password).subscribe(
//       data => {
//         console.log(data);
//         this.isSuccessful = true;
//         this.isSignUpFailed = false;
//       },
//       err => {
//         this.errorMessage = err.error.message;
//         this.isSignUpFailed = true;
//       }
//     );
//   }
// }
