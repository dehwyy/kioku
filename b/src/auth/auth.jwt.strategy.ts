import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import * as dotenv from 'dotenv'
import { InjectModel } from '@nestjs/mongoose'
import AuthTokenDB from '@src/auth/models/auth.schema'
import mongoose, { Model } from 'mongoose'
import { JwtService } from '@nestjs/jwt'

interface tokenPayload {
  email: string
  id: string
  iat: number
  exp: number
}

dotenv.config()

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(AuthTokenDB.name) private AuthToken: Model<AuthTokenDB>,
    private jwtService: JwtService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: false,
    })
  }

  async validate(payload: tokenPayload) {
    const id = new mongoose.Types.ObjectId(payload.id)
    const tokenInDb = await this.AuthToken.findOne({
      userId: id,
    })
    const tokenPayload = this.jwtService.decode(tokenInDb.token) as tokenPayload
    if (payload.iat !== tokenPayload.iat) return null
    return payload
  }
}
