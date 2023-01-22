import { Field, ID, ObjectType } from '@nestjs/graphql'
import QuizCardQL from '@src/quizCard/models/quizCard.model'

@ObjectType({ description: 'CollectionModel' })
export default class CollectionQL {
  @Field(type => ID)
  _id: string

  @Field({ nullable: false })
  collectionName: string

  @Field(type => [QuizCardQL], { nullable: 'items' })
  quizCards: QuizCardQL[]
}
