import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Profile } from 'src/app/models/userModels';
import { appService } from '../state/user.service';
import { userProfile } from '../state/user.selectors';
import { retrieveProfile } from '../state/user.action';
import { Emitters } from 'src/app/emitter/emitter';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
 
  // Component properties
  // loader:boolean= true
  name: string;
  email: string;
  img: string;
  state: boolean = false;
  state1: boolean = true;
  selectedFile: any | File = null;
  form: FormGroup;
  ss$: any;

  // Constructor and dependencies injection
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store<{ userdetails: Profile }>,
    private appService: appService,
    private toastr: ToastrService,
    private http: HttpClient
  ) {}

  // OnInit lifecycle hook
  ngOnInit(): void {
    // Subscribe to userProfile state from the store
    this.ss$ = this.store.pipe(select(userProfile)).subscribe((userProfileData) => {
      if (userProfileData) {
        console.log(userProfileData);
        this.name = userProfileData.name;
        this.email = userProfileData.email;
        this.img = userProfileData?.profileImage;
        console.log(this.img, 'image variable');
  
        this.state = Boolean(userProfileData?.name);
        this.state1 = !this.state;
      }
      
      // setTimeout(() => {
      //   this.loader=false;
      // }, 2000);

    });

    // Initialize the form group
    this.form = this.formBuilder.group({
      image: [''],
    });

    // Retrieve user profile data from the server
    this.http
      .get('http://localhost:5000/user', { withCredentials: true })
      .subscribe(
        (res: any) => {
          this.store.dispatch(retrieveProfile());
          Emitters.authEmitter.emit(true);
        },
        (err) => {
          this.router.navigate(['/']);
          Emitters.authEmitter.emit(false);
        }
      );
  }

  // Event handler for file selection
  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }

  // Form submission handler
  onSubmit() {
    const formData = new FormData();
    formData.append('image', this.selectedFile, this.selectedFile.name);

    this.http
      .post('http://localhost:5000/profile-upload', formData, {
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          this.store.dispatch(retrieveProfile());
          Emitters.authEmitter.emit(true);
          this.toastr.success('Saved', 'Success');
        },
        (err) => {
          const errorMessage = err.error.message;
          this.toastr.error(errorMessage, 'Error!');
        }
      );
  }
}
