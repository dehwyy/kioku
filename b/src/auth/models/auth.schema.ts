import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import UserDB from '@src/user/models/user.schema'
import { IAuthTokenDB } from '@src/auth/models/auth.interfaces'

@Schema({ collection: 'authTokens' })
export default class AuthTokenDB implements IAuthTokenDB {
  @Prop({ isRequired: true, type: String })
  token: string
  @Prop({ type: mongoose.Types.ObjectId, ref: () => UserDB })
  userId: mongoose.Types.ObjectId
}

export const AuthTokenSchema = SchemaFactory.createForClass(AuthTokenDB)
