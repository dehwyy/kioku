import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose from 'mongoose'
import CardDB from '@src/card/models/card.schema'

@Schema({ collection: 'quizCards' })
export default class QuizCardDB {
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
