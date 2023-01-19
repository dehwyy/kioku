import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import cardInputType from './card.it'
@Schema()
export default class Card implements cardInputType {
  @Prop({ isRequired: true })
  face: string

  @Prop({ isRequired: true })
  backface: string
}
export const CardSchema = SchemaFactory.createForClass(Card)
