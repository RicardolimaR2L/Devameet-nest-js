import {  IsNumber, Min, Max, IsString } from "class-validator"
import { JoinRoomDto } from "./joinroom.dto"
import { MeetMessageHelper } from "src/meet/helpers/meetmessagesHelper";

export class UpdateUserPostionDto extends JoinRoomDto {
 @IsNumber({},{message: MeetMessageHelper.UPDATE_XY_NOT_VALID})
 @Min(0, {message: MeetMessageHelper.UPDATE_XY_NOT_VALID})
 @Max(8 ,{message: MeetMessageHelper.UPDATE_XY_NOT_VALID})
 x:number; 
 
 @IsNumber({},{message: MeetMessageHelper.UPDATE_XY_NOT_VALID})
 @Min(0, {message: MeetMessageHelper.UPDATE_XY_NOT_VALID})
 @Max(8 ,{message: MeetMessageHelper.UPDATE_XY_NOT_VALID}) 
 y:number; 
 
 @IsString({message: MeetMessageHelper.UPDATE_ORIENTATION_NOT_VALID})
  orientation:string; 
  
} 