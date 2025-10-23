import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'dbQuizzy.sqlite',
      entities: [],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
