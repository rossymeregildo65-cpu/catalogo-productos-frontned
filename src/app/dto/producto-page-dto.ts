import { ProductoDto } from "./producto-dto";

export class ProductoPageDto {
    public content: ProductoDto[] = [];
    public totalElements!: number;
    public totalPages!: number;
    public size!: number;
    public number!: number;
}