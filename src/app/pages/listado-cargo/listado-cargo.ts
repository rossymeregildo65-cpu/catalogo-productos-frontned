import { Component, OnInit, signal } from '@angular/core';
import { CargoService } from '../../services/cargo-service';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { LpadPipe } from '../../pipes/lpad-pipe';
import { CargoPageDto } from '../../dto/cargo-page-dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado-cargo',
  templateUrl: './listado-cargo.html',
  styles: ``,
})
export class ListadoCargo implements OnInit {

  public cargos = signal<CargoPageDto>(new CargoPageDto());

  constructor(private service: CargoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCargos(1);
  }

  public ranges(x: number): number[] {
    let rango:number[] = [];

    for (let i = 1; i <= x; i++) {
      rango[i - 1] = i;
    }

    return rango;
  }

  public loadCargos(pageNumber: number) {
    this.service.getCargosPageable(pageNumber).subscribe({
      next: cargos => {
        this.cargos.set(cargos);
        console.log(this.cargos());
      }, 
      error: error => console.log('Problemas al obtener los cargos', error),
      complete: () => console.log('Terminé')
    });
  }

  public openNewCargo() {
    sessionStorage.setItem('type', 'N');
    this.router.navigate(['/cargo']);
  }

  public openViewCargo(id: number) {
    sessionStorage.setItem('type', 'V');
    this.router.navigate(['/cargo', id]);
  }

  public openEditCargo(id:number) {
    sessionStorage.setItem('type', 'E');
    this.router.navigate(['/cargo', id]);
  }

  public removeCargo(id: number) {
    this.service.deleteCargo(id).subscribe({
      next: () => this.loadCargos(1),
      error: error => console.log('Problemas al eliminar', error)
    });
  }

}
