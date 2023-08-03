import { NestFactory } from '@nestjs/core'; 
import { AppModule } from './app.module';

//Criação da função Bootstrap 
async function bootstrap() {  
  const app = await NestFactory.create(AppModule);//Cria o projeto NEST a partir do app.module. 
  await app.listen(3000);// Sobe a aplicação dna porta 3000
}
bootstrap(); 

