import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { LoginComponent } from './components/user/login/login.component';
import { HomeComponent } from './components/user/home/home.component';
import { NavbarComponent } from './components/user/navbar/navbar.component';
import { SignupComponent } from './components/user/signup/signup.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { AdminNavComponent } from './components/admin/admin-nav/admin-nav.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { StoreModule } from '@ngrx/store';
import { postReducer, profileReducer } from './components/user/state/user.reducer';
import { appService } from './components/user/state/user.service';
import { EffectsModule } from '@ngrx/effects';
import { AppEffect } from './components/user/state/user.effects';
import { UserListComponent } from './components/admin/user-list/user-list.component';
import { NewUserComponent } from './components/admin/new-user/new-user.component';
import { EditUserComponent } from './components/admin/edit-user/edit-user.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { RouterModule } from '@angular/router';
import { AuthGuardTsComponent } from './components/auth.guard';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    SignupComponent,
    AdminHomeComponent,
    AdminLoginComponent,
    AdminNavComponent,
    ProfileComponent,
    UserListComponent,
    NewUserComponent,
    EditUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    StoreModule.forRoot({allusers:postReducer ,userdetails:profileReducer}),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    EffectsModule.forRoot([AppEffect]),

  ],
  providers: [appService,AuthGuardTsComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}

