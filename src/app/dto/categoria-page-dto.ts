import { CategoriaDto } from "./categoria-dto";

export class CategoriaPageDto {
    public content: CategoriaDto[] = [];
    public totalElements!: number;
    public totalPages!: number;
    public size!: number;
    public number!: number;
}