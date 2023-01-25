import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose from 'mongoose'
import CardDB from '@src/card/models/card.schema'
import { IQuizCardBase } from '@src/quizCard/models/quizCard.interfaces'

@Schema({ collection: 'quizCards' })
export default class QuizCardDB implements IQuizCardBase<CardDB> {
  @Prop({ isRequired: true })
  quizCardName: string

  @Prop({
    type: [
      { type: mongoose.Types.ObjectId, ref: () => CardDB, required: false },
    ],
  })
  cards: CardDB[]
}

export const QuizCardSchema = SchemaFactory.createForClass(QuizCardDB)
