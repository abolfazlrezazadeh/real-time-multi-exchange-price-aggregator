import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CheckOtpDto, CreateAuthDto } from './dto/create-auth.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { swaggerConsumes } from 'src/common/enums/swagger-consumes.enum';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiConsumes(swaggerConsumes.UrlEncoded, swaggerConsumes.Json)
  register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }

  @Post('login')
  @ApiConsumes(swaggerConsumes.UrlEncoded, swaggerConsumes.Json)
  login(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.login(createAuthDto);
  }

  @Post('check-otp')
  @ApiConsumes(swaggerConsumes.UrlEncoded, swaggerConsumes.Json)
  checkOtp(@Body() checkOtpDto: CheckOtpDto) {
    return this.authService.checkOtp(checkOtpDto);
  }
}
