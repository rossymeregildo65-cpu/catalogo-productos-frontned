import { Component, OnInit, signal } from '@angular/core';
import { CargoDto } from '../../dto/cargo-dto';
import { CargoService } from '../../services/cargo-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cargo',
  imports: [FormsModule, CommonModule],
  templateUrl: './cargo.html',
})
export class Cargo implements OnInit {

  public title = signal<string>('');
  public cargo = signal<CargoDto>(new CargoDto());
  public type: string = '';

  constructor(
    private service: CargoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.type = sessionStorage.getItem('type') || '';

    if (this.type == 'V') {
      this.title.set('Ver Cargo');
    } else if (this.type == 'E') {
      this.title.set('Editar Cargo');
    } else {
      this.title.set('Nuevo Cargo');
    }

    const codigo: number = this.route.snapshot.params['codigo'];

    if (codigo) {
      this.service.getCargo(codigo).subscribe({
        next: data => this.cargo.set(data),
        error: error => console.log('Problemas al obtener la información', error)
      });
    }
  }

  public save(): void {

    if (this.type == 'N') {
      this.service.saveNewCargo(this.cargo()).subscribe({
        next: () => this.back(),
        error: error => console.log('Problemas al crear', error)
      });
    } else {
      this.service.saveEditCargo(this.cargo()).subscribe({
        next: () => this.back(),
        error: error => console.log('Problemas al crear', error)
      });
    }
  }

  public back(): void {
    this.router.navigate(['/listado-cargo']);
  }


}
