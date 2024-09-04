import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { MyLoggerModule } from './my-logger/my-logger.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

import * as fs from 'fs';

@Module({
  imports: [UsersModule, DatabaseModule, ThrottlerModule.forRoot([{
    name: 'short',
    ttl: 1000,
    limit: 3
  },
  {
    name: 'long',
    ttl: 60000,
    limit: 100
  }
  ]), MyLoggerModule, AuthModule, 
  JwtModule.register({ 
    privateKey: fs.readFileSync('./certificates/private.key'),
    publicKey: fs.readFileSync('./certificates/public.key'),
    signOptions: { expiresIn: '1h', algorithm: 'RS256' }, 
    global: true })],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: ThrottlerGuard, }],
})
export class AppModule {}
