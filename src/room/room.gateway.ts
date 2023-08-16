import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { RoomService } from './room.service';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { JoinRoomDto } from './dtos/joinroom.dto';
import { UpdateUserPostionDto } from './dtos/updateposition.dto';
import { ToglMuteDto } from './dtos/toglMute.Dto';

type ActiveSocketType = {
  room: string;
  id: string;
  userId: string;
};

@WebSocketGateway({ cors: true })
export class RoomGateway implements OnGatewayInit, OnGatewayDisconnect {
  wws: any;
  constructor(private readonly service: RoomService) {}
  @WebSocketServer() wss: Server;

  private logger = new Logger(RoomGateway.name);
  private activeSockets: ActiveSocketType[] = [];

  handleDisconnect(client: any, ...args: any[]) {
    this.logger.debug(`client: ${client.id} disconnected`);
  }
  afterInit(client: any, ...args: any[]) {
    this.logger.log('Gateway initialized');
  }
  @SubscribeMessage('join')
  async handleJoin(client: Socket, payload: JoinRoomDto) {
    const { link, userId } = payload;

    const existingOnSocket = this.activeSockets.find(
      (socket) => socket.room === link && socket.id === client.id,
    );

    if (!existingOnSocket) {
      this.activeSockets.push({ room: link, id: client.id, userId });
      const dto = {
        link,
        userId,
        x: 2,
        y: 2,
        orientation: 'down',
      } as UpdateUserPostionDto;

      await this.service.updateUserPosition(client.id, dto);
      const users = await this.service.listenUsersPositionByLink(link);

      this.wws.emit(`${link} -update-user-list`, { users });
      client.broadcast.emit(`${link} -add-user-list,`, { user: client.id });
    }

    return this.logger.debug(
      ` Socket client: ${client.id} starr to join room ${link}`,
    );
  }
  @SubscribeMessage('move')
  async handleMove(client: Socket, payload: UpdateUserPostionDto) {
    const { link, userId, x, y, orientation } = payload;
    const dto = {
      link,
      userId,
      x,
      y,
      orientation: 'down',
    } as UpdateUserPostionDto;
    await this.service.updateUserPosition(client.id, dto);
    const users = await this.service.listenUsersPositionByLink(link);
    this.wws.emit(`${link} -update-user-list`, { users });
  }

  @SubscribeMessage('Toggl-Mute-User')
  async handleToglMute(_: Socket, payload: ToglMuteDto) {
    const { link } = payload;

    await this.service.updateUserMute(payload);
    const users = await this.service.listenUsersPositionByLink(link);
    this.wws.emit(`${link} -update-user-list`, { users });
  }
}
