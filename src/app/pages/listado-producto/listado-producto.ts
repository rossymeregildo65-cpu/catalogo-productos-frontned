import { Component, OnInit, signal } from '@angular/core';
import { ProductoService } from '../../services/producto-service';
import { DatePipe, UpperCasePipe, DecimalPipe } from '@angular/common'; 
import { LpadPipe } from '../../pipes/lpad-pipe';
import { ProductoPageDto } from '../../dto/producto-page-dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado-producto',
  templateUrl: './listado-producto.html',
  styles: ``,
  imports: [DecimalPipe],
})
export class ListadoProducto implements OnInit {

  public productos = signal<ProductoPageDto>(new ProductoPageDto());

  constructor(private service: ProductoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProductos(1);
  }

  public ranges(x: number): number[] {
    let rango:number[] = [];

    for (let i = 1; i <= x; i++) {
      rango[i - 1] = i;
    }

    return rango;
  }

  public loadProductos(pageNumber: number) {
    this.service.getProductosPageable(pageNumber).subscribe({
      next: productos => {
        this.productos.set(productos);
        console.log(this.productos());
      }, 
      error: error => console.log('Problemas al obtener los productos', error),
      complete: () => console.log('Terminé')
    });
  }

  public openNewProducto() {
    sessionStorage.setItem('type', 'N');
    this.router.navigate(['/producto']);
  }

  public openViewProducto(id: number) {
    sessionStorage.setItem('type', 'V');
    this.router.navigate(['/producto', id]);
  }

  public openEditProducto(id:number) {
    sessionStorage.setItem('type', 'E');
    this.router.navigate(['/producto', id]);
  }

 public removeProducto(id: number): void {
  if (confirm('¿Está seguro de eliminar este producto?')) {
    this.service.deleteProducto(id).subscribe({
      next: () => {
        alert('Producto eliminado correctamente');
        this.loadProductos(this.productos().number + 1);
      },
      error: error => console.log('Problemas al eliminar', error)
    });
  }
}
}
