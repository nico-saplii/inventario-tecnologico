import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Equipo } from './entities/equipo.entity';
import { CreateEquipoDto } from './dto/create-equipo.dto';
import { UpdateEquipoDto } from './dto/update-equipo.dto';

@Injectable()
export class EquiposService {
  constructor(
    @InjectRepository(Equipo)
    private readonly equipoRepository: Repository<Equipo>,
  ) {}

  async create(createEquipoDto: CreateEquipoDto): Promise<Equipo> {
    const existe = await this.equipoRepository.findOne({
      where: { codigoInventario: createEquipoDto.codigoInventario },
    });
    if (existe) {
      throw new ConflictException('El código de inventario ya está registrado.');
    }
    const nuevoEquipo = this.equipoRepository.create(createEquipoDto);
    return await this.equipoRepository.save(nuevoEquipo);
  }

  async findAll(): Promise<Equipo[]> {
    return await this.equipoRepository.find();
  }

  async findOne(id: number): Promise<Equipo> {
    const equipo = await this.equipoRepository.findOne({ where: { id } });
    if (!equipo) {
      throw new NotFoundException(`Equipo con ID ${id} no encontrado.`);
    }
    return equipo;
  }

  async update(id: number, updateEquipoDto: UpdateEquipoDto): Promise<Equipo> {
    const equipo = await this.findOne(id);
    Object.assign(equipo, updateEquipoDto);
    return await this.equipoRepository.save(equipo);
  }

  async remove(id: number): Promise<void> {
    const equipo = await this.findOne(id);
    await this.equipoRepository.remove(equipo);
  }
}