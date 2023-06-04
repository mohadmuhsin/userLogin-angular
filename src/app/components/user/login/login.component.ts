import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Emitters } from 'src/app/emitter/emitter';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: '',
      password: '',
    });

    const isLoggedIn = localStorage.getItem('isULoggedIn');

    if (isLoggedIn) {
      this.router.navigate(['/']);
    }
  }

  validateEmail = (email: any) => {
    // Regular expression pattern for email validation
    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email.match(validRegex)) {
      return true;
    } else {
      return false;
    }
  };

  submit(): void {
    let user = this.form.getRawValue();

    if (user.username === '' || user.password === '') {
      this.toastr.error('Please enter all the fields', 'Warning!');
    } else if (!this.validateEmail(user.username)) {
      this.toastr.warning('Please enter a valid email', 'Warning!');
    } else {
      this.http
        .post('http://localhost:5000/login', user, { withCredentials: true })
        .subscribe(
          (res) => {
            this.router.navigate(['/']);
            localStorage.setItem('isULoggedIn','true');
          },
          (err) => {
            const errorMessage = err.error.message || 'An error occurred';
            this.toastr.error(errorMessage, 'Error!');
          }
        );
    }
  }
}
