import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CheckOtpDto, CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User, UserEntity } from '../user/entities/user.entity';
import { Model, Types } from 'mongoose';
import { Otp, OtpEntity } from '../user/entities/otp.entity';
import { InjectModel } from '@nestjs/mongoose';
import { EntityNames } from 'src/common/enums/entity-names';
import { AuthMessages } from 'src/common/messages/auth.messages';
import { randomInt } from 'crypto';
import { TokenAuthService } from './token.auth.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(EntityNames.USER) private userModel: Model<User>,
    @InjectModel(EntityNames.OTP) private otpModel: Model<Otp>,
    private tokenService: TokenAuthService,
  ) {}
  async register(createAuthDto: CreateAuthDto) {
    const { mobile } = createAuthDto;
    let user = await this.userModel.findOne({ mobile });
    if (user) {
      throw new BadRequestException(AuthMessages.USER_ALREADY_EXISTS);
    }
    user = await this.userModel.create({ mobile });
    const otp = await this.saveOtp(user._id);
    return {
      statusCode: 200,
      code: otp.code,
    };
  }

  async login(createAuthDto: CreateAuthDto) {
    const { mobile } = createAuthDto;
    let user = await this.userModel.findOne({ mobile });
    if (!user) {
      throw new BadRequestException(AuthMessages.USER_NOT_FOUND);
    }
    const otp = await this.saveOtp(user._id);
    return {
      statusCode: 200,
      code: otp.code,
    };
  }

  async checkOtp(checkOtpDto: CheckOtpDto) {
    const { mobile, code } = checkOtpDto;
    const now = new Date();
    // find user
    const user = await this.userModel.findOne({ mobile });
    if (!user) throw new UnauthorizedException(AuthMessages.LoginIsRequired);
    // find otp
    const otp = await this.otpModel.findOne({
      userId: user._id,
      code,
      expiresAt: { $gt: now },
    });
    if (!otp) throw new UnauthorizedException(AuthMessages.OTP_INCORRECT);
    // create access token
    const token = await this.tokenService.createAccessToken({
      userId: user._id.toString(),
    });
    return {
      statusCode: 200,
      token,
    };
  }

  async getUserFromAccessToken(token: string) {
    const { userId } = await this.tokenService.verifyAccessToken(token);
    const user = await this.userModel.findById({ userId });
    if (!user) throw new UnauthorizedException(AuthMessages.LoginIsRequired);
    return user;
  }
  
  async saveOtp(userId: Types.ObjectId) {
    // 5 digits
    const code = randomInt(10_000, 99_999).toString();
    // 2 minuts
    const expiresIn = new Date(Date.now() + 2 * 60 * 1000);
    // find otp exist
    let existOtp: boolean = false;
    let otp = await this.otpModel.findOne({ userId });
    if (otp) {
      existOtp = true;
      otp.code = code;
      otp.expiresAt = expiresIn;
    } else {
      otp = await this.otpModel.create({
        userId,
        code,
        expiresIn,
      });
    }

    otp = await otp.save();
    if (!existOtp) {
      await this.userModel.updateOne({ _id: userId }, { otpId: otp._id });
    }
    return otp;
  }
}
