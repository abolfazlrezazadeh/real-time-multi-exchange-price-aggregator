import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EntityNames } from 'src/common/enums/entity-names';
import { UserEntity } from './entities/user.entity';
import { OtpEntity } from './entities/otp.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EntityNames.USER, schema: UserEntity },
      { name: EntityNames.OTP, schema: OtpEntity },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
