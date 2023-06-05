import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Emitters } from 'src/app/emitter/emitter';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  message: string;
  constructor(private http: HttpClient, private toastr: ToastrService) {}
  ngOnInit(): void {
    console.log("here its ");
    
    this.http
      .get('http://localhost:5000/user', {
        withCredentials: true,
        
      })
      .subscribe(
        (res: any) => {
          this.message = `Hi ${res.name}`;
          Emitters.authEmitter.emit(true)
        },
        (err) => {
          this.message = "you are not logged in";
          Emitters.authEmitter.emit(false)
        }
      );
      
  }
}
