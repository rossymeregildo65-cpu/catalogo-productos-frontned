import { CargoDto } from "./cargo-dto";
import { PageDto } from "./page-dto";

export class CargoPageDto {

    public content: CargoDto[] = [];
    public page!: PageDto;

}