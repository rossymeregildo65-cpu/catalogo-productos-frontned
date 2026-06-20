export class ProductoDto  {

    id!: number;
    descripcion?: string;
    precioUnitario?: number;
    stock?: number;
    idMarca!: number;
    idCategoria!: number;
    marcaDescripcion?: string;
    categoriaDescripcion?: string;
}