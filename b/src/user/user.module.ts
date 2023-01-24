import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserResolver } from './user.resolver'
import { MongooseModule } from '@nestjs/mongoose'
import UserDB, { UserSchema } from '@src/user/models/user.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserDB.name, schema: UserSchema }]),
  ],
  exports: [UserService],
  providers: [UserResolver, UserService],
})
export class UserModule {}
