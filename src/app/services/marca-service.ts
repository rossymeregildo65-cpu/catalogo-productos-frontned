import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MarcaDto } from '../dto/marca-dto';
import { map, Observable } from 'rxjs';
import { MarcaPageDto } from '../dto/marca-page-dto';
// import { MarcaPageDto } from '../dto/marca-page-dto';

@Injectable({
  providedIn: 'root',
})
export class MarcaService {
  
private readonly baseUrl: string = 'http://localhost:8081/api/marcas';

  constructor(private http: HttpClient) {}

  getMarcas(): Observable<MarcaDto[]> {
    return this.http.get<MarcaDto[]>(this.baseUrl);
  }

  getMarcasPageable(pageNumber: number): Observable<MarcaPageDto> {
  return this.http.get<MarcaPageDto>(
    `${this.baseUrl}/page?page=${pageNumber - 1}&size=5`
  );
}

  // getMarcasPageable(pageNumber: number): Observable<MarcaPageDto> {
  //   return this.http.get<MarcaPageDto>(`${this.baseUrl}/page?page=${pageNumber - 1}&size=5`);
  // }

  getMarca(codigo: number): Observable<MarcaDto> {
    return this.http.get<MarcaDto>(`${this.baseUrl}/${codigo}`);
  }

  getMarcasInactivas(pageNumber: number): Observable<MarcaPageDto> {
  return this.http.get<MarcaPageDto>(
    `${this.baseUrl}/inactivos?page=${pageNumber - 1}&size=5`
  );
}

activarMarca(id: number): Observable<any> {
  return this.http.put<any>(`${this.baseUrl}/activar/${id}`, {});
}

  saveNewMarca(dto: MarcaDto): Observable<MarcaDto> {
    return this.http.post<MarcaDto>(this.baseUrl, dto);
  }

  saveEditMarca(dto: MarcaDto): Observable<MarcaDto> {
    return this.http.put<MarcaDto>(`${this.baseUrl}/${dto.id}`, dto);
  }

  deleteMarca(codigo: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${codigo}`);
  }

}
