import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose from 'mongoose'
import QuizCardDB from '@src/quizCard/models/quizCard.schema'
import { ICollectionBase } from '@src/collection/models/collection.interfaces'
import UserDB from '@src/user/models/user.schema'
import { IModelWithLikesDB } from '@src/global/types/like'

@Schema({ collection: 'collections' })
export default class CollectionDB
  implements IModelWithLikesDB<ICollectionBase<QuizCardDB>>
{
  @Prop({ isRequired: true })
  collectionName: string

  @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: () => QuizCardDB }] })
  quizCards: QuizCardDB[]

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

export const CollectionSchema = SchemaFactory.createForClass(CollectionDB)
