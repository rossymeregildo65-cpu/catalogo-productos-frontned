import { Component, OnInit, signal } from '@angular/core';
import { CategoriaDto } from '../../dto/categoria-dto';
import { CategoriaService } from '../../services/categoria-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categoria',
  imports: [FormsModule, CommonModule],
  templateUrl: './categoria.html',
})
export class Categoria implements OnInit {

  public title = signal<string>('');
  public categoria = signal<CategoriaDto>(new CategoriaDto());
  public type: string = '';

  constructor(
    private service: CategoriaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.type = sessionStorage.getItem('type') || '';

    if (this.type == 'V') {
      this.title.set('Ver Categoria');
    } else if (this.type == 'E') {
      this.title.set('Editar Categoria');
    } else {
      this.title.set('Nuevo Categoria');
    }

    const codigo: number = this.route.snapshot.params['codigo'];

    if (codigo) {
      this.service.getCategoria(codigo).subscribe({
        next: data => this.categoria.set(data),
        error: error => console.log('Problemas al obtener la información', error)
      });
    }
  }

  public save(): void {
    if (this.type == 'N') {
      this.service.saveNewCategoria(this.categoria()).subscribe({
        next: () => this.back(),
        error: error => console.log('Problemas al crear', error)
      });
    } else {
      this.service.saveEditCategoria(this.categoria()).subscribe({
        next: () => this.back(),
        error: error => console.log('Problemas al crear', error)
      });
    }
  }

  public back(): void {
    this.router.navigate(['/listado-categoria']);
  }


}
