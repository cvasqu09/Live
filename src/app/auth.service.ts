import { Injectable } from '@angular/core';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthService {

  auth0 = new auth0.WebAuth({
    clientID: 'YdXJArBHl5cZiJP9Fjp4aCv2wd4LsYBg',
    domain: 'jstuve.auth0.com',
    responseType: 'token id_token',
    audience: 'https://jstuve.auth0.com/userinfo',
    scope: 'openid profile'
  });

  constructor() { }

  public login(): void {
    this.auth0.authorize();
  }

  public logout(): void {

    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    console.log("Logout Successful!");
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = ''; //Without this, the URL will contain token information
        this.setSession(authResult);
        console.log("Login Successful!");
      } else if (err) {
        console.log("Login Failed...");
      }
    });
  }

  private setSession(authResult): void {
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public isAuthenticated(): boolean {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}