import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductoDto } from '../dto/producto-dto';
import { map, Observable } from 'rxjs';
import { ProductoPageDto } from '../dto/producto-page-dto';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  
private readonly baseUrl: string = 'http://localhost:8083/api/productos';

  constructor(private http: HttpClient) {}

  getProductos(): Observable<ProductoDto[]> {
    return this.http.get<ProductoDto[]>(this.baseUrl);
  }

  getProductosPageable(pageNumber: number): Observable<ProductoPageDto> {
    return this.http.get<ProductoPageDto>(`${this.baseUrl}/page?page=${pageNumber - 1}&size=10`);
  }

  getProducto(codigo: number): Observable<ProductoDto> {
    return this.http.get<ProductoDto>(`${this.baseUrl}/${codigo}`);
  }

  saveNewProducto(dto: ProductoDto): Observable<ProductoDto> {
    return this.http.post<ProductoDto>(this.baseUrl, dto);
  }

  saveEditProducto(dto: ProductoDto): Observable<ProductoDto> {
    return this.http.put<ProductoDto>(`${this.baseUrl}/${dto.id}`, dto);
  }

  deleteProducto(codigo: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${codigo}`);
  }

}
