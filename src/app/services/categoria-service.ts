import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoriaDto } from '../dto/categoria-dto';
import { map, Observable } from 'rxjs';
import { CategoriaPageDto } from '../dto/categoria-page-dto';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  
private readonly baseUrl: string = 'http://localhost:8081/api/categorias';
  constructor(private http: HttpClient) {}

  getCategorias(): Observable<CategoriaDto[]> {
    return this.http.get<CategoriaDto[]>(this.baseUrl);
  }

  getCategoriasPageable(pageNumber: number): Observable<CategoriaPageDto> {
    return this.http.get<CategoriaPageDto>(`${this.baseUrl}/page?page=${pageNumber - 1}&size=5`);
  }

  getCategoria(codigo: number): Observable<CategoriaDto> {
    return this.http.get<CategoriaDto>(`${this.baseUrl}/${codigo}`);
  }

  saveNewCategoria(dto: CategoriaDto): Observable<CategoriaDto> {
    return this.http.post<CategoriaDto>(this.baseUrl, dto);
  }

  saveEditCategoria(dto: CategoriaDto): Observable<CategoriaDto> {
    return this.http.put<CategoriaDto>(`${this.baseUrl}/${dto.id}`, dto);
  }

  deleteCategoria(codigo: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${codigo}`);
  }

  getCategoriasInactivas(pageNumber: number): Observable<CategoriaPageDto> {
  return this.http.get<CategoriaPageDto>(
    `${this.baseUrl}/inactivos?page=${pageNumber - 1}&size=5`
  );
}

activarCategoria(id: number): Observable<any> {
  return this.http.put<any>(`${this.baseUrl}/activar/${id}`, {});
}
}
