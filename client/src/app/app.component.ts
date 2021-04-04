import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import User from '../app/models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Kupido - Talalj szerelemre';
  users: User[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.http.get<User[]>("https://localhost:5001/api/users").subscribe( users => {
      for( const user of users ){
        this.users.push( user );
      }
      console.log( this.users );
    },
    err => {
      alert(err.statusText);
    });
  }

}
