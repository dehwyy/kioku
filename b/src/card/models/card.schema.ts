import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ICardRequest } from '@src/card/models/card.interfaces'

@Schema({ collection: 'cards' })
export default class CardDB implements ICardRequest {
  @Prop({ isRequired: true })
  face: string

  @Prop({ isRequired: true })
  backface: string
}
export const CardSchema = SchemaFactory.createForClass(CardDB)
