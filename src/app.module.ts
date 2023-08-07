import { Module } from '@nestjs/common';
import { APP_GUARD} from '@nestjs/core'
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { JwtAuthGuard } from './auth/guards/jwt.guards';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    AuthModule,
    UserModule
  ],
  controllers: [],
  providers: [
    {provide: APP_GUARD, useClass: JwtAuthGuard} //traz pra todo o sistema o Guard  fazendo todo ele estar protegido.
  ],
})
export class AppModule {}
