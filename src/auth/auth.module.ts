import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {PrismaService} from "../prisma.service";
import {JwtStrategy} from "./jwt.strategy";
import {UsersModule} from "../users/users.module";

export const jwtSecret = "ddd57a0fa140285d5ff46b8d434974cd74724f3d54a98fbcd9c5b5bfeba22f99";

@Module({
  imports: [
      PassportModule,
      JwtModule.register({
        secret: jwtSecret,
        signOptions: { expiresIn: '24h' },
      }),
      UsersModule
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtStrategy],
})
export class AuthModule {}
