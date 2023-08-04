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
      transform: true, // transforma automaticamente os dados de entrada para os tipos definidos em suas classes de destino. 
      whitelist: true, // converterá somente as propriedades dos objetos de entrada que estão definidas nas classes de destino.
      forbidNonWhitelisted: false, // permitirá que objetos de entrada contenham campos não definidos na classe de destino. Se algum campo inesperado for fornecido, o pipe não retornará erros e permitirá que o objeto seja processado.
    }),
  );

  app.setGlobalPrefix('api'); // adiciona o prefixo "API"  em todas as rotas da aplicação

  await app.listen(3000); // Sobe a aplicação na porta 3000
}
bootstrap();
