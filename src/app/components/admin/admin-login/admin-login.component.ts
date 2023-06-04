import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Emitters } from 'src/app/emitter/emitter';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: '',
      password: '',
    });

    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn) {
      this.router.navigate(['/adminHome']);
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
    console.log('hhhhhhhhhhhhi');

    let admin = this.form.getRawValue();
    console.log(admin);

    if (admin.email === '' || admin.password === '') {
      this.toastr.error('All fields are required', 'Warning!');
    } else if (!this.validateEmail(admin.email)) {
      this.toastr.error('Please enter a valid email', 'Warning!');
    } else {
      console.log('correct');

      this.http
        .post('http://localhost:5000/adminLogin', admin, {
          withCredentials: true,
        })
        .subscribe(
          (res) => {
            this.router.navigate(['/adminHome']);
            localStorage.setItem('isLoggedIn', 'true');
          },
          (err) => {
            const errorMessage = err.error.message || 'An error occurred';
            this.toastr.error(errorMessage, 'Warning!');
          }
        );
    }
  }
}
