import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";
import { JwtStrategyRefresh } from "./jwt-refresh.strategy";
import * as dotenv from "dotenv";
dotenv.config();

@Module({
  imports: [UserModule, PassportModule, JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '300s' },
  }),],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtStrategyRefresh],
  controllers: [AuthController],
})
export class AuthModule {}
