import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmpleadoDto } from '../dto/empleado-dto';
import { EmpleadoPageDto } from '../dto/empleado-page-dto';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private readonly baseUrl = 'http://localhost:9090/api/v1/empleado';

  constructor(private http: HttpClient) {}

  getEmpleadosPageable(pageNumber: number): Observable<EmpleadoPageDto> {
    return this.http.get<EmpleadoPageDto>(
      `${this.baseUrl}/page?page=${pageNumber - 1}&size=5`
    );
  }

  getEmpleado(id: number): Observable<EmpleadoDto> {
    return this.http.get<EmpleadoDto>(`${this.baseUrl}/${id}`);
  }

  saveNewEmpleado(dto: EmpleadoDto): Observable<EmpleadoDto> {
    return this.http.post<EmpleadoDto>(this.baseUrl, dto);
  }

  saveEditEmpleado(dto: EmpleadoDto): Observable<EmpleadoDto> {
    return this.http.put<EmpleadoDto>(`${this.baseUrl}/${dto.id}`, dto);
  }

  deleteEmpleado(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
