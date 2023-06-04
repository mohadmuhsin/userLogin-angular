import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  form: FormGroup;
  name: any;
  email: any;
  user_id: any;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: this.name,
      email: this.email,
    });

    this.user_id = this.route.snapshot.paramMap.get('userId');
    console.log(this.user_id, 'user id got');
    this.getUser(this.user_id);
  }

  submit() {
    const user = this.form.getRawValue();
    user.email = this.email;
    if (user.name === '') {
      this.toastr.error("field can't be empty", 'warning!');
    } else if (user.name === null) {
      this.toastr.error('No changes made', 'warning!');
    } else if (user.name === this.name) {
      this.toastr.error('No changes made', 'warning!');
    } else {
      this.http
        .post('http://localhost:5000/editUser', user, { withCredentials: true })
        .subscribe(
          () => {
            this.router.navigate(['/userList']);
            this.toastr.success("User name edited successfully", "Success!")
          },
          (err) => {
            this.toastr.error(err.error.message, '!Error');
          }
        );
    }
  }

  getUser(user_id: any) {
    this.http
      .post(
        `http://localhost:5000/getUser/${user_id}`,
        {},
        {
          withCredentials: true,
        }
      )
      .subscribe((res: any) => {
        // console.log(res, 'get user for edit');

        this.name = res.name;
        this.email = res.email;
      });
  }
}
