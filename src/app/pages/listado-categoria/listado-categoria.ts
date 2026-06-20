import { Component, OnInit, signal } from '@angular/core';
import { CategoriaService } from '../../services/categoria-service';
import { CategoriaPageDto } from '../../dto/categoria-page-dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado-categoria',
  templateUrl: './listado-categoria.html',
  styles: ``
})
export class ListadoCategoria implements OnInit {

  public categorias = signal<CategoriaPageDto>(new CategoriaPageDto());
  public mostrarInactivos: boolean = false;

  constructor(
    private service: CategoriaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategorias(1);
  }

  public ranges(x: number): number[] {
    let rango: number[] = [];

    for (let i = 1; i <= x; i++) {
      rango[i - 1] = i;
    }

    return rango;
  }

  public loadCategorias(pageNumber: number) {

    if (this.mostrarInactivos) {
      this.service.getCategoriasInactivas(pageNumber).subscribe({
        next: categorias => this.categorias.set(categorias),
        error: error => console.log('Problemas al obtener categorias', error)
      });
    } else {
      this.service.getCategoriasPageable(pageNumber).subscribe({
        next: categorias => this.categorias.set(categorias),
        error: error => console.log('Problemas al obtener categorias', error)
      });
    }
  }

  public verActivos() {
    this.mostrarInactivos = false;
    this.loadCategorias(1);
  }

  public verInactivos() {
    this.mostrarInactivos = true;
    this.loadCategorias(1);
  }

  public activarCategoria(id: number) {
    this.service.activarCategoria(id).subscribe({
      next: () => {
        alert('Categoría activada correctamente');
        this.loadCategorias(1);
      },
      error: error => console.log('Problemas al activar', error)
    });
  }

  public openNewCategoria() {
    sessionStorage.setItem('type', 'N');
    this.router.navigate(['/categoria']);
  }

  public openViewCategoria(id: number) {
    sessionStorage.setItem('type', 'V');
    this.router.navigate(['/categoria', id]);
  }

  public openEditCategoria(id: number) {
    sessionStorage.setItem('type', 'E');
    this.router.navigate(['/categoria', id]);
  }

  public removeCategoria(id: number) {
    this.service.deleteCategoria(id).subscribe({
      next: () => {
        alert('Categoría desactivada correctamente');
        this.loadCategorias(1);
      },
      error: error => console.log('Problemas al eliminar', error)
    });
  }
}