import { Component, OnInit, signal } from '@angular/core';
import { ProductoDto } from '../../dto/producto-dto';
import { ProductoService } from '../../services/producto-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MarcaDto } from '../../dto/marca-dto';
import { MarcaService } from '../../services/marca-service';
import { CategoriaService } from '../../services/categoria-service';
import { CategoriaDto } from '../../dto/categoria-dto';

@Component({
  selector: 'app-producto',
  imports: [FormsModule, CommonModule],
  templateUrl: './producto.html',
})
export class Producto implements OnInit {

  public title = signal<string>('');
  public producto = signal<ProductoDto>(new ProductoDto());
  public marcas = signal<MarcaDto[]>([]);
  public categorias = signal<CategoriaDto[]>([]);
  public type: string = '';

  constructor(
    private service: ProductoService,
    private marcaService: MarcaService,
    private categoriaService: CategoriaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.type = sessionStorage.getItem('type') || 'N';

    if (this.type == 'V') {
      this.title.set('Ver Producto');
    } else if (this.type == 'E') {
      this.title.set('Editar Producto');
    } else {
      this.title.set('Nuevo Producto');
    }

    this.marcaService.getMarcas().subscribe({
        next: data => this.marcas.set(data),
        error: error => console.log('Problemas al obtener marcas', error)
      });

    this.categoriaService.getCategorias().subscribe({
        next: data => this.categorias.set(data),
        error: error => console.log('Problemas al obtener marcas', error)
      });

    const codigo: number = this.route.snapshot.params['codigo'];

    if (codigo) {
      this.service.getProducto(codigo).subscribe({
        next: data => this.producto.set(data),
        error: error => console.log('Problemas al obtener la información', error)
      });
    }
  }

  public updateProducto(field: string, value: any): void {
  if (field === 'precioUnitario') {
    value = Number(value);
  }

  if (field === 'stock' || field === 'idMarca' || field === 'idCategoria') {
    value = Number(value);
  }

  this.producto.update(p => ({
    ...p,
    [field]: value
  }));
}

  public save(): void {

  const prod = {
    ...this.producto(),
    estado: true
  };

  console.log('Producto a guardar:', prod);
  console.log('type:', this.type);

  if (!prod.id || this.type == 'N') {
    this.service.saveNewProducto(prod).subscribe({
     next: () => {
      alert('Producto guardado correctamente');
      this.back();
    },
    error: error => console.log('Problemas al crear', error)
  });
} else {
  this.service.saveEditProducto(prod).subscribe({
    next: () => {
      alert('Producto actualizado correctamente');
      this.back();
    },
    error: error => console.log('Problemas al editar', error)
  });
} 
  }

  public back(): void {
    this.router.navigate(['/listado-producto']);
  }

}
