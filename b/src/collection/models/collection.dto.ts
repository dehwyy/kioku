import { ArgsType, Field, ID } from '@nestjs/graphql'
import {
  ICollectionBase,
  IUpdateQuizCardRequest,
} from '@src/collection/models/collection.interfaces'

@ArgsType()
export class CreateCollectionDTO implements ICollectionBase<string> {
  @Field({ nullable: false })
  collectionName: string

  @Field(type => [String])
  quizCards: string[]

  @Field(type => String)
  creator: string

  @Field(type => ID)
  creatorId: string

  @Field()
  theme: string
}

@ArgsType()
export class UpdateCollectionDTO implements IUpdateQuizCardRequest {
  @Field({ description: 'collectionId' })
  id: string

  @Field({ description: 'quizCardId' })
  cardId: string
}
