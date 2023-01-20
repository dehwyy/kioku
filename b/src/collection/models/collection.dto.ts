import { ArgsType, Field } from '@nestjs/graphql'

@ArgsType()
export class CreateCollectionDTO {
  @Field({ nullable: false })
  collectionName: string

  @Field(type => [String])
  quizCards: string[]
}

@ArgsType()
export class UpdateCollectionDTO {
  @Field({ description: 'collectionId' })
  id: string

  @Field({ description: 'quizCardId' })
  cardId: string
}
