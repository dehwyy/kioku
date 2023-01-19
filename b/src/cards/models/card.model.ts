import { Field, ID, Int, ObjectType } from '@nestjs/graphql'

@ObjectType({ description: 'card model' })
export default class Card {
  @Field(type => ID)
  _id: string

  @Field({ nullable: false })
  face: string

  @Field({ nullable: false })
  backface: string
}
