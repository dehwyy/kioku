import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose from 'mongoose'
import CardDB from '@src/card/models/card.schema'
import { IQuizCardBase } from '@src/quizCard/models/quizCard.interfaces'
import UserDB from '@src/user/models/user.schema'
import { IModelWithLikesDB } from '@src/global/types/like'

@Schema({ collection: 'quizCards' })
export default class QuizCardDB
  implements IModelWithLikesDB<IQuizCardBase<CardDB>>
{
  @Prop({ isRequired: true })
  quizCardName: string

  @Prop({
    type: [
      { type: mongoose.Types.ObjectId, ref: () => CardDB, required: false },
    ],
  })
  cards: CardDB[]

  @Prop({
    default: () => [],
    isRequired: false,
    type: [
      {
        type: mongoose.Types.ObjectId,
        ref: () => UserDB,
        required: false,
      },
    ],
  })
  likes: mongoose.Types.ObjectId[]
}

export const QuizCardSchema = SchemaFactory.createForClass(QuizCardDB)
