import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { mongooseConfig } from 'src/config/mongoose.config';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { PriceModule } from '../price/price.module';
import { SchedularModule } from '../schedular/schedular.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    // config env
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(process.cwd(), '.env'),
    }),
    // config db
    mongooseConfig,
    UserModule,
    AuthModule,
    ScheduleModule.forRoot(),
    SchedularModule,
    PriceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
