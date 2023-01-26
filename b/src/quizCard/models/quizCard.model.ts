import { Field, ID, ObjectType } from '@nestjs/graphql'
import CardQL from '@src/card/models/card.model'
import { IQuizCardQLResponse } from '@src/quizCard/models/quizCard.interfaces'
import { IModelWithLikesQL } from '@src/global/types/like'

@ObjectType({ description: 'QuizCardModel' })
export default class QuizCardQL
  implements IModelWithLikesQL<IQuizCardQLResponse>
{
  @Field(type => ID)
  _id: string

  @Field({ nullable: false })
  quizCardName: string

  @Field(type => [CardQL], { nullable: 'items' })
  cards: CardQL[]

  @Field(type => [String])
  likes: string[]
}
