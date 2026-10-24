import { IsNotEmpty, IsString, IsEnum, IsOptional, IsDateString } from 'class-validator';

export class CreateEquipoDto {
  @IsNotEmpty({ message: 'El código de inventario es obligatorio' })
  @IsString()
  codigoInventario: string;

  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString()
  nombre: string;

  @IsNotEmpty({ message: 'El tipo es obligatorio' })
  @IsString()
  tipo: string;

  @IsNotEmpty({ message: 'La marca es obligatoria' })
  @IsString()
  marca: string;

  @IsNotEmpty({ message: 'El modelo es obligatorio' })
  @IsString()
  modelo: string;

  @IsNotEmpty({ message: 'La ubicación es obligatoria' })
  @IsString()
  ubicacion: string;

  @IsOptional()
  @IsEnum(['operativo', 'en_mantenimiento', 'dado_de_baja'])
  estado?: string;

  @IsOptional()
  @IsDateString()
  fechaAdquisicion?: string;

  @IsOptional()
  @IsString()
  observaciones?: string;
}