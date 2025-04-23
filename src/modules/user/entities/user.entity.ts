import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
import { EntityNames } from 'src/common/enums/entity-names';
import { UserRole } from 'src/common/enums/items-enum';

@Schema({collection: EntityNames.USER})
export class User {
  @Prop({ required: true, unique: true, type: String })
  mobile: string;

  @Prop({ required: false, type: Boolean,default:false })
  isVerified: boolean;

  @Prop({ required: false, type: String })
  password: string;
  @Prop({
    required: false,
    enum: UserRole,
    default: UserRole.USER,
    type: String,
  })
  role: string;

  @Prop({ required: false, type: Types.ObjectId, ref: 'otp' })
  otpId: Types.ObjectId;

  @Prop({ required: false, type: Date })
  birthDate: Date;

  @Prop({ required: false, type: String })
  firstName: string;

  @Prop({ required: false, type: String })
  lastName: string;

  @Prop({ required: false, type: String })
  IDSerial: string;

  @Prop({ required: false, type: String })
  NationalCode: string;
}

export const UserEntity = SchemaFactory.createForClass(User);