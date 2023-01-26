import { Field, ID, ObjectType } from '@nestjs/graphql'
import QuizCardQL from '@src/quizCard/models/quizCard.model'
import { ICollectionQLResponse } from '@src/collection/models/collection.interfaces'
import { IModelWithLikesQL } from '@src/global/types/like'

@ObjectType({ description: 'CollectionModel' })
export default class CollectionQL
  implements IModelWithLikesQL<ICollectionQLResponse>
{
  @Field(type => ID)
  _id: string

  @Field({ nullable: false })
  collectionName: string

  @Field(type => [QuizCardQL], { nullable: 'items' })
  quizCards: QuizCardQL[]

  @Field(type => [String])
  likes: string[]
}
