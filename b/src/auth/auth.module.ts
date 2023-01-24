import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthResolver } from './auth.resolver'
import { JwtModule } from '@nestjs/jwt'
import JwtStrategy from '@src/auth/auth.jwt.strategy'
import { MongooseModule } from '@nestjs/mongoose'
import AuthTokenDB, { AuthTokenSchema } from '@src/auth/models/auth.schema'
import { UserModule } from '@src/user/user.module'
import * as dotenv from 'dotenv'
dotenv.config()
@Module({
  imports: [
    JwtModule.register({
      signOptions: {
        expiresIn: '24h',
      },
      secret: process.env.JWT_SECRET,
    }),
    MongooseModule.forFeature([
      { name: AuthTokenDB.name, schema: AuthTokenSchema },
    ]),
    UserModule,
  ],
  providers: [AuthService, AuthResolver, JwtStrategy],
})
export class AuthModule {}
