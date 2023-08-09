import {Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/user/user.schema';
import  mongoose, { HydratedDocument } from 'mongoose';

export type MeetDocument = HydratedDocument<Meet>;


@Schema()
export class Meet {
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  user: User;

  @Prop({required: true})
  color: string;
  
  @Prop({required: true})
  name: string;
  
  @Prop({required: true})
  link: string;
  
}

export const MeetSchema = SchemaFactory.createForClass(Meet);