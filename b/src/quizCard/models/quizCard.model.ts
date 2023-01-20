import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType({ description: 'QuizCardModel' })
export default class QuizCardQL {
  @Field(type => ID)
  _id: string

  @Field({ nullable: false })
  quizCardName: string

  @Field(type => [String])
  cards: string[]
}
