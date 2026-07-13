import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ProductModel } from '../../core/models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/products`;

  public getAll(): Observable<ProductModel[]> {
    return this.httpClient.get<ProductModel[]>(this.apiUrl);
  }

  public get(id: number): Observable<ProductModel> {
    return this.httpClient.get<ProductModel>(`${this.apiUrl}/${id}`);
  }

  public add(data: ProductModel): Observable<ProductModel> {
    return this.httpClient.post<ProductModel>(this.apiUrl, data);
  }

  public update(id: number, data: ProductModel): Observable<ProductModel> {
    return this.httpClient.put<ProductModel>(`${this.apiUrl}/${id}`, data);
  }

  public delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }
}
