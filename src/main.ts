
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT ?? 3000

  const config = new DocumentBuilder()
    .setTitle('Quizzy')
    .setDescription('O Quizzy é uma API robusta e intuitiva desenvolvida para criar, gerenciar e personalizar sistemas de quiz voltados para estudantes. Utilizando inteligência artificial, o Quizzy adapta perguntas, fornece explicações detalhadas e sugere conteúdos personalizados para potencializar o aprendizado')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  
  await app.listen(PORT);
  console.log(`O servidor swagger está rodando na rota http://localhost:${PORT}/api`)
}
bootstrap();
