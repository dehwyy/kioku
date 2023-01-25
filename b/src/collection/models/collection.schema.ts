import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose from 'mongoose'
import QuizCardDB from '@src/quizCard/models/quizCard.schema'
import { ICollectionBase } from '@src/collection/models/collection.interfaces'

@Schema({ collection: 'collections' })
export default class CollectionDB implements ICollectionBase<QuizCardDB> {
  @Prop({ isRequired: true })
  collectionName: string

  @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: () => QuizCardDB }] })
  quizCards: QuizCardDB[]
}

export const CollectionSchema = SchemaFactory.createForClass(CollectionDB)
