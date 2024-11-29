import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { configApp } from './common/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { PhishingModule } from './modules/phishing/phishing.module';
import { configForEnv } from './configForEnv';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PhishingModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configApp],
      envFilePath: ['.env'],
    }),
    MongooseModule.forRoot(configForEnv.databaseUrl, {
      dbName: configForEnv.databaseName,
    }),
  ],
  providers: [AppService, JwtAuthGuard],
})
export class AppModule {}
