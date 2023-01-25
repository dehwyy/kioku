import { Field, ID, ObjectType } from '@nestjs/graphql'
import { ICardQL } from '@src/card/models/card.interfaces'

@ObjectType({ description: 'CardModel' })
export default class CardQL implements ICardQL {
  @Field(type => ID)
  _id: string

  @Field({ nullable: false })
  face: string

  @Field({ nullable: false })
  backface: string
}
