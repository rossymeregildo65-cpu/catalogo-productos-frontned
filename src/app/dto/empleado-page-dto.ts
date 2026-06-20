import { EmpleadoListDto } from "./empleado-list-dto";
import { PageDto } from "./page-dto";

export class EmpleadoPageDto {
  public content: EmpleadoListDto[] = [];
  public page!: PageDto;
}
