import { Module } from '@nestjs/common';
import { APP_GUARD} from '@nestjs/core'
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { MeetModule } from './meet/meet.module';
import { JwtAuthGuard } from './auth/guards/jwt.guards';
import { RoomModule } from './room/room.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    AuthModule,
    UserModule,
    MeetModule,
    RoomModule
  ],
  controllers: [],
  providers: [
    {provide: APP_GUARD, useClass: JwtAuthGuard}
  ],
})
export class AppModule {}
