import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  constructor(public accountService: AccountService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  login() {
    this.accountService.login(this.credentials).subscribe( response => {
      console.log( response );
      this.loggedIn = true;
      this.router.navigate(['members']);
    });
  }

  logout() {
    this.loggedIn = false;
    this.accountService.logout();
    this.router.navigate(['/']);
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
