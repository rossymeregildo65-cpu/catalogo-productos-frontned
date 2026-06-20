import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RolDto } from '../dto/rol-dto';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private readonly baseUrl = 'http://localhost:9090/api/v1/rol';

  constructor(private http: HttpClient) {}

  getRoles(): Observable<RolDto[]> {
    return this.http.get<RolDto[]>(this.baseUrl);
  }
}
