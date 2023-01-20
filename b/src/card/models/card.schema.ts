import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { CardInputType } from './card.ab'
@Schema({ collection: 'cards' })
export default class CardDB implements CardInputType {
  @Prop({ isRequired: true })
  face: string

  @Prop({ isRequired: true })
  backface: string
}
export const CardSchema = SchemaFactory.createForClass(CardDB)
