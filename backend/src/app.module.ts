import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipo } from './equipos/entities/equipo.entity';
import { EquiposModule } from './equipos/equipos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234', // Cambia esto si tu root no tiene contraseña (déjalo en '' si no usa)
      database: 'inventario_db',
      entities: [Equipo],
      synchronize: true, // Crea la tabla automáticamente
    }),
    EquiposModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}