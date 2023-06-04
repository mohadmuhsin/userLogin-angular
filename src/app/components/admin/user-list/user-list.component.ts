import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Emitters } from 'src/app/emitter/emitter';
import { Users } from 'src/app/models/userModels';
import { appService } from '../../user/state/user.service';
import { ToastrService } from 'ngx-toastr';
import { uniqueEmail } from '../../user/state/user.selectors';
import { retrievePosts } from '../../user/state/user.action';
import { Ng2SearchPipe } from 'ng2-search-filter';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  providers: [Ng2SearchPipe],
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  searchText: string;
  authenticate = false;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store<{ allusers: Users[] }>,
    private appService: appService,
    private toaster: ToastrService
  ) {}

  userdata$ = this.store.pipe(select(uniqueEmail));

  ngOnInit(): void {
    this.http
      .get('http://localhost:5000/admin', { withCredentials: true })
      .subscribe(
        (res: any) => {
          console.log(res, 'user list before dispatch');

          this.store.dispatch(retrievePosts());
          console.log(this.store, 'emited');

          Emitters.authEmitter.emit(true);
        },
        (err) => {
          this.router.navigate(['/adminLogin']);
          Emitters.authEmitter.emit(false);
        }
      );
   
        const isLoggedIn = localStorage.getItem('isLoggedIn');
    
        if (!isLoggedIn) {
          this.router.navigate(['/adminLogin']);
        }
    
  }

  // edit
  editUser(userId: any) {
    
    this.router.navigate(['/editUser',userId])
  }


  // delete
  deleteUser(user_id: any) {
    console.log("comng to delete");
    console.log(user_id, "user id");
    
    this.http
      .post(`http://localhost:5000/deleteUser`, {user_id:user_id}, {
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          console.log(res, "want to delete");
            
          this.store.dispatch(retrievePosts());
          this.toaster.success('Deleted', 'Success!');
          Emitters.authEmitter.emit(true);
        },
        (err) => {
          this.router.navigate(['/admin']);
          Emitters.authEmitter.emit(false);
        }
      );
  }
    
  // create
  createUser() {
    this.router.navigate(['/createUsers'])
  }

 
  logout():void{
    this.http.post('http://localhost:5000/adminLogout',{},{
      withCredentials: true
    }).subscribe(()=> this.authenticate =false)
    localStorage.removeItem('isLoggedIn') 
  }
}
