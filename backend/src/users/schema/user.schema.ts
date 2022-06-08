import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, SchemaTypes, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ versionKey: false, timestamps: true })
export class User {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: ObjectId;
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  role: string;

  @Prop()
  name: string;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
