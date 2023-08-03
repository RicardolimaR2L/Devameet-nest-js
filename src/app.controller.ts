import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() // Decorator CONTROLLER  cria rotas HTTP
export class AppController { 
  constructor(private readonly appService: AppService) {}

  @Get() // decorator GET cria rotas get dentro dop controller
  getHello(): string {
    return this.appService.getHello();
  }
}
