import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { EntityNames } from 'src/common/enums/entity-names';
import { UserEntity } from '../user/entities/user.entity';
import { OtpEntity } from '../user/entities/otp.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenAuthService } from './token.auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EntityNames.USER, schema: UserEntity },
      { name: EntityNames.OTP, schema: OtpEntity },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtService,TokenAuthService],
})
export class AuthModule {}
