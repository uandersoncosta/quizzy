import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'dbQuizzy.sqlite',
      entities: [],
      synchronize: true,
    }),
    UserModule,
  ],
})
export class AppModule {}
