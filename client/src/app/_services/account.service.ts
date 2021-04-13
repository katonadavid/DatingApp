import { User, LoginCredentials } from './../_models/User';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User | null>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(cred: LoginCredentials) {
    return this.http.post<User>(this.baseUrl + 'account/login', cred).pipe(
      map((response: User) => {
        const user = response;
        if( user ) {
          this.setCurrentUser( user );
        }
      })
    )
  }

  register(cred: LoginCredentials) {
    return this.http.post<User>(this.baseUrl + 'account/register', cred).pipe(
      map((response: User) => {
        const user = response;
        if( user ) {
          this.setCurrentUser( user );
        }
        return user;
      })
    )
  }

  setCurrentUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
