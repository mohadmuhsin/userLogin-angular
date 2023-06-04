import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Users } from 'src/app/models/userModels';
import { appService } from '../../user/state/user.service';
import { retrievePosts } from '../../user/state/user.action';
import { Emitters } from 'src/app/emitter/emitter';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css'],
})
export class NewUserComponent implements OnInit {
  form: FormGroup;
  authenticated = false;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private store: Store<{ alluser: Users[] }>,
    private appService: appService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: '',
      email: '',
      password: '',
    });
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

    if (
      user.name.trim() === '' ||
      user.email.trim() === '' ||
      user.password.trim() === ''
    ) {
      this.toastr.error('All field are required');
    } else if (!this.validateEmail(user.email)) {
      this.toastr.error('Enter a valid email');
    } else {
      this.http
        .post('http://localhost:5000/newUser', user, {
          withCredentials: true,
        })
        .subscribe(
          (res: any) => {
            console.log(res, 'new user');
            this.store.dispatch(retrievePosts());
            Emitters.authEmitter.emit(true);
            this.router.navigate(['/userList']);
            
          },
          (err) => {
            this.router.navigate(['/userList']);
            Emitters.authEmitter.emit(false);
          }
        );
    }
  }
}
