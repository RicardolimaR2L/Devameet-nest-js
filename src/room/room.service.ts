import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Meet, MeetDocument } from 'src/meet/schemas/meet.schema';
import {
  MeetObject,
  MeetObjectDocument,
} from 'src/meet/schemas/meetobjects.schema';
import { Position, PositionDocument } from './schemas/position.schema';
import { UserService } from 'src/user/user.service';
import { RoomMessagesHelper } from './helpers/roommessage.helper';
import { UpdateUserPostionDto } from './dtos/updateposition.dto';

@Injectable()
export class RoomService {
  private logger = new Logger(RoomService.name);

   constructor(
        @InjectModel(Meet.name) private readonly meetModel: Model<MeetDocument>,
        @InjectModel(MeetObject.name) private readonly objectModel: Model<MeetObjectDocument>,
        @InjectModel(Position.name) private readonly positionModel: Model<PositionDocument>,
        private readonly userService: UserService
    ) { }

  async getRoom(link: string) {//entra na sala pelo link
    this.logger.debug(`getRoom -${link}`);

    const meet = await this._getMeet(link);

    const objects = this.objectModel.find({ meet }); // retornamos os objects da sala 
    return {
      link,
      name: meet.name,
      color: meet.color,
      objects,
    };
  }
  async listenUsersPositionByLink(link: string) {
    this.logger.debug(`listenUsersPositionByLink -${link}`);

    const meet = await this._getMeet(link);
    return await this.positionModel.find({ meet });
  }
  async deleteUsersPosition(clientId: String) { // deletar a posição dos ususarios pelo clientID
    this.logger.debug(`deleteUsersPosition -${clientId}`);
    return await this.positionModel.deleteMany({ clientId });
  }

  updateUserPosition(dto: UpdateUserPostionDto){

  }

  async _getMeet(link: string) {
    const meet = await this.meetModel.findOne({ link });
    if (!meet) {
      throw new BadRequestException(RoomMessagesHelper.JOIN_LINK_NOT_VALID);
    }
    return meet;
  }
}
