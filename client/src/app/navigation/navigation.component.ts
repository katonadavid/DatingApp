import { Component, OnInit } from '@angular/core';
import { LoginCredentials, User } from '../_models/User';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  currentUser: User | null;
  credentials: LoginCredentials = {
    username: "",
    password: ""
  }

  loggedIn: boolean = false;

  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  login() {
    this.accountService.login(this.credentials).subscribe( response => {
      console.log( response );
      this.loggedIn = true;
    }, error => {
      console.log( error );
    });
  }

  logout() {
    this.loggedIn = false;
    this.accountService.logout();
  }

  getCurrentUser() {
    this.accountService.currentUser$.subscribe( user => {
      this.loggedIn = !!user;
      this.currentUser = user;
    }, error => {
      console.log( error );
    })
  }

}
