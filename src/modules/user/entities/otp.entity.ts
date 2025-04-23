import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { EntityNames } from "src/common/enums/entity-names";



@Schema({collection: EntityNames.OTP})
export class Otp {
    @Prop({ required: true, type: String })
    code: string;

    @Prop({ required: true, type: Date })
    expiresAt: Date;

    @Prop({ required: true, type: Types.ObjectId, ref: 'user' })
    userId: Types.ObjectId;
}

export const OtpEntity = SchemaFactory.createForClass(Otp);
