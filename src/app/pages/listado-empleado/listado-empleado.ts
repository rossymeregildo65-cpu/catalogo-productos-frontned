import { Component, OnInit, signal } from '@angular/core';
import { EmpleadoService } from '../../services/empleado-service';
import { EmpleadoPageDto } from '../../dto/empleado-page-dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado-empleado',
  templateUrl: './listado-empleado.html',
})
export class ListadoEmpleado implements OnInit {

  public empleados = signal<EmpleadoPageDto>(new EmpleadoPageDto());

  constructor(
    private service: EmpleadoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEmpleados(1);
  }

  ranges(x: number): number[] {
    return Array.from({ length: x }, (_, i) => i + 1);
  }

  loadEmpleados(page: number) {
    this.service.getEmpleadosPageable(page).subscribe({
      next: data => this.empleados.set(data)
    });
  }

  openNewEmpleado() {
    sessionStorage.setItem('type', 'N');
    this.router.navigate(['/empleado']);
  }

  openViewEmpleado(id: number) {
    sessionStorage.setItem('type', 'V');
    this.router.navigate(['/empleado', id]);
  }

  openEditEmpleado(id: number) {
    sessionStorage.setItem('type', 'E');
    this.router.navigate(['/empleado', id]);
  }

  removeEmpleado(id: number) {
    this.service.deleteEmpleado(id).subscribe({
      next: () => this.loadEmpleados(1)
    });
  }
}
