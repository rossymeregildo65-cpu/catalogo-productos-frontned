export class EmpleadoDto {
  public id!: number;
  public nombres?: string;
  public apellidos?: string;
  public nombreCompleto?: string;
  public usuario?: string;

  public contrasenia?: string;

  public idRol?: number;
  public idCargo?: number;

  public rolDescripcion?: string;
  public cargoDescripcion?: string;

  public estado?: boolean;
}
