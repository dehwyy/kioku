import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserResolver } from './user.resolver'
import { MongooseModule } from '@nestjs/mongoose'
import UserDB, { UserSchema } from '@src/user/models/user.schema'
import CardModule from '@src/card/card.module'
import QuizCardModule from '@src/quizCard/quizCard.module'
import CollectionModule from '@src/collection/collection.module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserDB.name, schema: UserSchema }]),
    CardModule,
    QuizCardModule,
    CollectionModule,
  ],
  exports: [UserService],
  providers: [UserResolver, UserService],
})
export default class UserModule {}
