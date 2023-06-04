import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardTsComponent implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const isULoggedIn = localStorage.getItem('isULoggedIn')

    if (isLoggedIn) {
      // User or admin is already logged in
      // Redirect them to the home page or any other appropriate route
      this.router.navigate(['/adminHome']); // Change this to the appropriate route
      return false;
    }
    if(isULoggedIn){
        this.router.navigate(['/'])
        return false;
    }



    return true;
  }
}
