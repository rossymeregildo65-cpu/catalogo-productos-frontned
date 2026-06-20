import { Component, OnInit } from '@angular/core';
import { EmpleadoDto } from '../../dto/empleado-dto';
import { EmpleadoService } from '../../services/empleado-service';
import { RolService } from '../../services/rol-service';
import { CargoService } from '../../services/cargo-service';
import { RolDto } from '../../dto/rol-dto';
import { CargoDto } from '../../dto/cargo-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-empleado',
  imports: [FormsModule],
  templateUrl: './empleado.html',
})

export class Empleado implements OnInit {

  public title = '';
  public empleado: EmpleadoDto = new EmpleadoDto();
  public type: string = '';

  public roles: RolDto[] = [];
  public cargos: CargoDto[] = [];

  constructor(
    private service: EmpleadoService,
    private rolService: RolService,
    private cargoService: CargoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.type = sessionStorage.getItem('type') || '';

    this.title =
      this.type === 'V' ? 'Ver Empleado' :
      this.type === 'E' ? 'Editar Empleado' :
      'Nuevo Empleado';

    this.loadRoles();
    this.loadCargos();

    const id = this.route.snapshot.paramMap.get('codigo');

    if (id) {
      this.service.getEmpleado(+id).subscribe({
        next: data => {
          this.empleado = data;
        },
        error: err => console.error('Error al cargar empleado', err)
      });
    }
  }


    private loadRoles(): void {
    this.rolService.getRoles().subscribe({
      next: data => this.roles = data
    });
  }

  private loadCargos(): void {
    this.cargoService.getCargos().subscribe({
      next: data => this.cargos = data
    });
  }

  save(): void {
    if (this.type === 'N') {
      this.service.saveNewEmpleado(this.empleado)
        .subscribe(() => this.back());
    } else {
      this.service.saveEditEmpleado(this.empleado)
        .subscribe(() => this.back());
    }
  }

  back(): void {
    this.router.navigate(['/listado-empleado']);
  }
}
