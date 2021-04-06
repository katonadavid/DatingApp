import { User, LoginCredentials } from './../_models/User';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Output() cancelReg = new EventEmitter();
  credentials: LoginCredentials = { username: '', password: '' };

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  register() {
    this.accountService.register( this.credentials ).subscribe( user => {
      console.log( user );
    });
  }

  cancel() {
    this.cancelReg.emit(false);
  }

}
