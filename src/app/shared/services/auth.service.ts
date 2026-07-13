import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignupModel, SignupResponse } from '../../core/models/signup.model';
import { LoginModel, LoginResponse } from '../../core/models/login.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authApiUrl = `${environment.apiUrl}/auth`;
  private readonly userApiUrl = `${environment.apiUrl}/users`;
  private readonly httpClient = inject(HttpClient);

  public signup(data: SignupModel): Observable<SignupResponse> {
    return this.httpClient.post<SignupResponse>(`${this.userApiUrl}`, {
      ...data,
      id: Date.now(),
    });
  }

  public login(data: LoginModel): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(
      `${this.authApiUrl}/login`,
      data,
    );
  }
}
