import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: '',
      email: '',
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

  submit() {
    let user = this.form.getRawValue();
    console.log(user);
    if (user.name.trim() === '' || user.email === '' || user.password === '') {
      this.toastr.error('please enter all the fields');
    } else if (!this.validateEmail(user.email)) {
      this.toastr.error('please enter a valid email');
    } else {
      this.http
        .post('http://localhost:5000/register', user, {
          withCredentials: true,
        })
        .subscribe(
          () => {
            this.router.navigate(['/']);
            localStorage.setItem('isULoggedIn', 'true');
          },

          (err) => {
            this.toastr.error(err.error.message);
          }
        );
    }
  }
}
