import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/user/login/login.component';
import { SignupComponent } from './components/user/signup/signup.component';
import { HomeComponent } from './components/user/home/home.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { UserListComponent } from './components/admin/user-list/user-list.component';
import { EditUserComponent } from './components/admin/edit-user/edit-user.component';
import { NewUserComponent } from './components/admin/new-user/new-user.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'adminHome', component: AdminHomeComponent },
  { path: 'adminLogin', component: AdminLoginComponent },
  { path: 'userProfile', component: ProfileComponent },
  { path: 'userList', component: UserListComponent },
  { path: 'editUser/:userId', component: EditUserComponent },
  { path: 'createUsers', component: NewUserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
