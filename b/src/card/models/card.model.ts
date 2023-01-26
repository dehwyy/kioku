import { Field, ID, ObjectType } from '@nestjs/graphql'
import { IModelWithLikesQL } from '@src/global/types/like'
import { ICardResponse } from '@src/card/models/card.interfaces'

@ObjectType({ description: 'CardModel' })
export default class CardQL implements IModelWithLikesQL<ICardResponse> {
  @Field(type => ID)
  _id: string

  @Field({ nullable: false })
  face: string

  @Field({ nullable: false })
  backface: string

  @Field(type => [String])
  likes: string[]
}
