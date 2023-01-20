import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose from 'mongoose'

@Schema({ collection: 'quizCards' })
export default class QuizCardDB {
  @Prop({ isRequired: true })
  quizCardName: string

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Card' })
  cards: mongoose.Schema.Types.ObjectId[]
}

export const QuizCardSchema = SchemaFactory.createForClass(QuizCardDB)
