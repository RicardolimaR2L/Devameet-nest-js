import { Controller, Get, Request, BadRequestException } from '@nestjs/common';
import { UserMessagesHelper } from './helpers/message.helper';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  async getUser(@Request() req) {
    const { userId } = req?.user;
    const user = await this.service.getUserById(userId);

    if (!user) {
      throw new BadRequestException(UserMessagesHelper.GET_USER_NOT_FOUND);
    }

    return {
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      id: user._id.toString(),
    };
  }
}
