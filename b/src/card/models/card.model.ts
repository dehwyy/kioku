import { Field, ID, ObjectType } from '@nestjs/graphql'
import { CardInputType } from './card.ab'

@ObjectType({ description: 'CardModel' })
export default class CardQL implements CardInputType {
  @Field(type => ID)
  _id: string

  @Field({ nullable: false })
  face: string

  @Field({ nullable: false })
  backface: string
}
