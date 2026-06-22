import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MarcaService } from '../../services/marca-service';
import { MarcaPageDto } from '../../dto/marca-page-dto';

@Component({
  selector: 'app-listado-marca',
  templateUrl: './listado-marca.html',
  styles: ``
})
export class ListadoMarca implements OnInit {

  public marcas = signal<MarcaPageDto>(new MarcaPageDto());

  constructor(
    private service: MarcaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMarcas(1);
  }

  public ranges(x: number): number[] {
    let rango: number[] = [];

    for (let i = 1; i <= x; i++) {
      rango[i - 1] = i;
    }

    return rango;
  }

 public mostrarInactivos: boolean = false;

public loadMarcas(pageNumber: number) {
  if (this.mostrarInactivos) {
    this.service.getMarcasInactivas(pageNumber).subscribe({
      next: marcas => this.marcas.set(marcas),
      error: error => console.log('Problemas al obtener marcas inactivas', error)
    });
  } else {
    this.service.getMarcasPageable(pageNumber).subscribe({
      next: marcas => this.marcas.set(marcas),
      error: error => console.log('Problemas al obtener marcas', error)
    });
  }
}

public verActivos() {
  this.mostrarInactivos = false;
  this.loadMarcas(1);
}

public verInactivos() {
  this.mostrarInactivos = true;
  this.loadMarcas(1);
}

public activarMarca(id: number) {
  this.service.activarMarca(id).subscribe({
    next: () => {
      alert('Marca activada correctamente');
      this.loadMarcas(1);
    },
    error: error => console.log('Problemas al activar marca', error)
  });
}

  public openNewMarca() {
    sessionStorage.setItem('type', 'N');
    this.router.navigate(['/marca']);
  }

  public openViewMarca(id: number) {
    sessionStorage.setItem('type', 'V');
    this.router.navigate(['/marca', id]);
  }

  public openEditMarca(id: number) {
    sessionStorage.setItem('type', 'E');
    this.router.navigate(['/marca', id]);
  }

  public removeMarca(id: number) {
    this.service.deleteMarca(id).subscribe({
      next: () => {
        alert('Marca eliminada correctamente');
        this.loadMarcas(1);
      },
      error: error => console.log('Problemas al eliminar marca', error)
    });
  }
}