import { Component, OnInit, signal } from '@angular/core';
import { MarcaDto } from '../../dto/marca-dto';
import { MarcaService } from '../../services/marca-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-marca',
  imports: [FormsModule, CommonModule],
  templateUrl: './marca.html',
})
export class Marca implements OnInit {

  public title = signal<string>('');
  public marca = signal<MarcaDto>(new MarcaDto());
  public type: string = '';

  constructor(
    private service: MarcaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.type = sessionStorage.getItem('type') || '';

    if (this.type == 'V') {
      this.title.set('Ver Marca');
    } else if (this.type == 'E') {
      this.title.set('Editar Marca');
    } else {
      this.title.set('Nueva Marca');
    }

    const codigo: number = this.route.snapshot.params['codigo'];

    if (codigo) {
      this.service.getMarca(codigo).subscribe({
        next: data => this.marca.set(data),
        error: error => console.log('Problemas al obtener la información', error)
      });
    }
  }

  public save(): void {
    if (this.type == 'N') {
      this.service.saveNewMarca(this.marca()).subscribe({
        next: () => this.back(),
        error: error => console.log('Problemas al crear', error)
      });
    } else {
      this.service.saveEditMarca(this.marca()).subscribe({
        next: () => this.back(),
        error: error => console.log('Problemas al actualizar', error)
      });
    }
  }

  public back(): void {
    this.router.navigate(['/listado-marca']);
  }
}