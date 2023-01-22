import { Field, ID, ObjectType } from '@nestjs/graphql'
import CardQL from '@src/card/models/card.model'

@ObjectType({ description: 'QuizCardModel' })
export default class QuizCardQL {
  @Field(type => ID)
  _id: string

  @Field({ nullable: false })
  quizCardName: string

  @Field(type => [CardQL], { nullable: 'items' })
  cards: CardQL[]
}
