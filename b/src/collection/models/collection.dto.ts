import { ArgsType, Field } from '@nestjs/graphql'
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
}

@ArgsType()
export class UpdateCollectionDTO implements IUpdateQuizCardRequest {
  @Field({ description: 'collectionId' })
  id: string

  @Field({ description: 'quizCardId' })
  cardId: string
}
