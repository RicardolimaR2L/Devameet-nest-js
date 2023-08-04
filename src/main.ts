import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';


//Criação da função Bootstrap
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['debug', 'error', 'log', 'warn'], // Essa propriedade Logger: mostra quais logs vão ser ou não imprsos no console da aplicação
  }); //Cria o projeto NEST a partir do app.module.

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Vai habilitar a transformação do que chega para os nossos objetos.
      whitelist: true, // Deixa converter somente o que foi mapeado.
      forbidNonWhitelisted: false, // não deixa retornar erros caso chegue algum campo inesperado
    }),
  );

  app.setGlobalPrefix('api'); // adiciona o prefixo "API"  em todas as rotas da aplicação

  await app.listen(3000); // Sobe a aplicação na porta 3000
}
bootstrap();
