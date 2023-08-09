import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Meet, MeetDocument } from './schemas/meet.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class MeetService {
  private readonly logger = new Logger(MeetService.name);

  constructor(
    @InjectModel(Meet.name) private readonly model: Model<MeetDocument>,
    private readonly userService: UserService,
  ) {}

  async getMeetByUser(userId: string) {
  this.logger.debug('getMeetByUser - ' + userId);
    return await this.model.find({user: userId});

}
}
