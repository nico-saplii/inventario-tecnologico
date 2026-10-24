import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
// Clase equipos
//indicamos si esta "operativo" , "en mantenimiento", "dado de baja" u "operativo"
@Entity('equipos')
export class Equipo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  codigoInventario: string;

  @Column()
  nombre: string;

  @Column()
  tipo: string;

  @Column()
  marca: string;

  @Column()
  modelo: string;

  @Column()
  ubicacion: string;

  @Column({
    type: 'enum',
    enum: ['operativo', 'en_mantenimiento', 'dado_de_baja'],
    default: 'operativo',
  })
  estado: string;

  @Column({ type: 'date', nullable: true })
  fechaAdquisicion: string;

  @Column({ type: 'text', nullable: true })
  observaciones: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}