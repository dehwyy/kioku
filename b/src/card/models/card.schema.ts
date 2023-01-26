import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ICardDB } from '@src/card/models/card.interfaces'
import mongoose from 'mongoose'
import UserDB from '@src/user/models/user.schema'

@Schema({ collection: 'cards' })
export default class CardDB implements ICardDB {
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
