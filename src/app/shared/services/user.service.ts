import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../../core/models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly apiUrl = `${environment.apiUrl}/users`;
  private readonly httpClient = inject(HttpClient);

  public get(id: number): Observable<UserModel> {
    return this.httpClient.get<UserModel>(`${this.apiUrl}/${id}`);
  }

  public getCurrent(): Observable<UserModel> {
    const id = localStorage.getItem('ngrxstore:userId');
    return this.httpClient.get<UserModel>(`${this.apiUrl}/${id}`);
  }
}
