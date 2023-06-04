import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitters } from 'src/app/emitter/emitter';
@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent implements OnInit {

  authenticate  = false;

  constructor(private http:HttpClient){}

  ngOnInit(): void {

      Emitters.authEmitter.subscribe((authe:boolean)=>{
        this.authenticate = authe
        console.log(this.authenticate,authe);
        
      })
  }

  logout():void{
    this.http.post('http://localhost:5000/adminLogout',{},{
      withCredentials: true
    }).subscribe(()=> this.authenticate =false)
    localStorage.removeItem('isLoggedIn') 
  }
}
