import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ICardResponse } from '@src/card/models/card.interfaces'
import mongoose from 'mongoose'
import UserDB from '@src/user/models/user.schema'
import { IModelWithLikesDB } from '@src/global/types/like'

@Schema({ collection: 'cards' })
export default class CardDB implements IModelWithLikesDB<ICardResponse> {
  @Prop({ isRequired: true })
  face: string

  @Prop({ isRequired: true })
  backface: string

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
export const CardSchema = SchemaFactory.createForClass(CardDB)
