import {
  IsEmail,
  MinLength,
  MaxLength,
  Matches,
  IsString,
} from 'class-validator';
import { UserMessageHelper } from '../helpers/message.helper';

export class RegisterDto {
  @MinLength(2, { message: UserMessageHelper.REGISTER_NAME_NOT_VALID })
  name: string;

  @IsEmail({}, { message: UserMessageHelper.REGISTER_EMAIL_NOT_VALID })
  email: string;

  @MinLength(4, { message: UserMessageHelper.REGISTER_STRONG_PASSWORD })
  @MaxLength(20, { message: UserMessageHelper.REGISTER_STRONG_PASSWORD })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: UserMessageHelper.REGISTER_STRONG_PASSWORD,
  })
  password: string;
  @IsString()
  avatar: string;
}
