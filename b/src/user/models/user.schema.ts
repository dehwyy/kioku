import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import QuizCardDB from '@src/quizCard/models/quizCard.schema'
import * as mongoose from 'mongoose'
import CollectionDB from '@src/collection/models/collection.schema'
import { UserExtraDB, UserBasicData } from '@src/user/models/user.interfaces'

@Schema({ collection: 'users' })
export default class UserDB implements UserExtraDB, UserBasicData {
  @Prop({ isRequired: true })
  email: string

  @Prop({ isRequired: true })
  username: string

  @Prop({ isRequired: true })
  password: string

  @Prop({
    type: [
      { type: mongoose.Types.ObjectId, ref: () => QuizCardDB, required: false },
    ],
  })
  quizCards: QuizCardDB[]

  @Prop({
    type: [
      {
        type: mongoose.Types.ObjectId,
        ref: () => CollectionDB,
        required: false,
      },
    ],
  })
  collections: CollectionDB[]
}

export const UserSchema = SchemaFactory.createForClass(UserDB)
