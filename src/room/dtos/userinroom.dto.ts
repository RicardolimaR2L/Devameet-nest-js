import { IsNotEmpty } from "class-validator"
import { RoomMessagesHelper } from "../helpers/roommessage.helper"

  export class userInRoom{    
    @IsNotEmpty({message:RoomMessagesHelper.JOIN_LINK_NOT_VALID})
    userInroom:boolean
  }