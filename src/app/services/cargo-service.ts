import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CargoDto } from '../dto/cargo-dto';
import { map, Observable } from 'rxjs';
import { CargoPageDto } from '../dto/cargo-page-dto';

@Injectable({
  providedIn: 'root',
})
export class CargoService {
  
  private readonly baseUrl: string = 'http://localhost:9090/api/v1/cargo';

  constructor(private http: HttpClient) {}

  getCargos(): Observable<CargoDto[]> {
    return this.http.get<CargoDto[]>(this.baseUrl);
  }

  getCargosPageable(pageNumber: number): Observable<CargoPageDto> {
    return this.http.get<CargoPageDto>(`${this.baseUrl}/page?page=${pageNumber - 1}&size=5`);
  }

  getCargo(codigo: number): Observable<CargoDto> {
    return this.http.get<CargoDto>(`${this.baseUrl}/${codigo}`);
  }

  saveNewCargo(dto: CargoDto): Observable<CargoDto> {
    return this.http.post<CargoDto>(this.baseUrl, dto);
  }

  saveEditCargo(dto: CargoDto): Observable<CargoDto> {
    return this.http.put<CargoDto>(`${this.baseUrl}/${dto.id}`, dto);
  }

  deleteCargo(codigo: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${codigo}`);
  }

}
