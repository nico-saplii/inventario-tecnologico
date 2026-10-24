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
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [Equipo],
        synchronize: true, // ¡Ojo! Solo para desarrollo (crea las tablas automáticamente)
      }),
      inject: [ConfigService],
    }),
    EquiposModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}