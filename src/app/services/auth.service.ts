import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  get isLoggedIn(): boolean {
    return true;
  }

  get token(): string | null {
    return '';
  }

  get userData(): Observable<any> {
    const url = `${environment.baseAPIUrl}/auth/me`;
    const options = {
      headers: new HttpHeaders()
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json'),
      withCredentials: true,
    };
    return this.http.post(url, {}, options);
  }

  checkAuth(): Observable<any> {
    return of({ isLoggedIn: true });
  }

  doLogin(username, password): Observable<any> {
    const url = `${environment.baseAPIUrl}/auth/login`;
    return this.http.post(url, {
      username,
      password,
    });
  }

  doLogout(): Observable<any> {
    const url = `${environment.baseAPIUrl}/auth/logout`;
    return this.http.delete(url);
  }
}
