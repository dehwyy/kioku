import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose from 'mongoose'
import QuizCardDB from '@src/quizCard/models/quizCard.schema'

@Schema({ collection: 'collections' })
export default class CollectionDB {
  @Prop({ isRequired: true })
  collectionName: string

  @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: () => QuizCardDB }] })
  quizCards: QuizCardDB[]
}

export const CollectionSchema = SchemaFactory.createForClass(CollectionDB)
