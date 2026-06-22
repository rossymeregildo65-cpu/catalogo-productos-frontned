import { MarcaDto } from './marca-dto';

export class MarcaPageDto {
  content: MarcaDto[] = [];
  totalPages: number = 0;
  totalElements: number = 0;
  size: number = 0;
  number: number = 0;
}