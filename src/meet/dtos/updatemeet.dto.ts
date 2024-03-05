import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  ValidateNested,
  IsNumber,
  Min,
  Max,
  IsString,
  IsBoolean,
} from 'class-validator';
import { CreateMeetDto } from './createmeet.dto';
import { MeetMessageHelper } from '../helpers/meetmessagesHelper';

export class UpdateMeetDto extends CreateMeetDto {
  @IsArray({ message: MeetMessageHelper.UPDATE_OBJECT_NAME_NOT_FOUND })
  @Type(() => UpdateMeetObjectDto)
  @ValidateNested({ each: true })
  objects: Array<UpdateMeetObjectDto>;
}
export class UpdateMeetObjectDto {
  @IsNotEmpty({ message: MeetMessageHelper.UPDATE_OBJECT_NAME_NOT_FOUND })
  name: string;

  @IsNumber({}, { message: MeetMessageHelper.UPDATE_XY_NOT_VALID })
  @Min(0, { message: MeetMessageHelper.UPDATE_XY_NOT_VALID })
  @Max(8, { message: MeetMessageHelper.UPDATE_XY_NOT_VALID })
  x: number;

  @IsNumber({}, { message: MeetMessageHelper.UPDATE_XY_NOT_VALID })
  @Min(0, { message: MeetMessageHelper.UPDATE_XY_NOT_VALID })
  @Max(8, { message: MeetMessageHelper.UPDATE_XY_NOT_VALID })
  y: number;

  @IsNumber({}, {message: MeetMessageHelper.UPDATE_WIDTH_HEIGHT_NOT_VALID})
  @Min(0, {message: MeetMessageHelper.UPDATE_XY_NOT_VALID})
  @Max(8, {message: MeetMessageHelper.UPDATE_XY_NOT_VALID})
  width: number;

  @IsNumber({}, {message: MeetMessageHelper.UPDATE_WIDTH_HEIGHT_NOT_VALID})
  @Min(0, {message: MeetMessageHelper.UPDATE_XY_NOT_VALID})
  @Max(8, {message: MeetMessageHelper.UPDATE_XY_NOT_VALID})
  height: number;

  @IsBoolean({message: MeetMessageHelper.UPDATE_CAN_WALK_NOT_VALID})
  canWalkOver: boolean;

  @IsNumber({}, { message: MeetMessageHelper.UPDATE_zindex_NOT_VALID })
  zIndex: number;

  @IsString({ message: MeetMessageHelper.UPDATE_ORIENTATION_NOT_VALID })
  orientation: string;
}
