import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from 'src/app/models/userModels';

@Injectable()
export class appService {
  getUserProfile() {
    throw new Error('Method not implemented.');
  }
  constructor(private http: HttpClient) {}

  loadUsers(): Observable<Users[]> {
    return this.http.get<Users[]>('http://localhost:5000/adminUsers', {
      withCredentials: true,
    });
  }

  loadProfile() {
    console.log("loadprofile() is called");
    
    return this.http.get('http://localhost:5000/profile', {
      withCredentials: true,
    });
  }
}
