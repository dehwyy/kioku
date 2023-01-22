import { ArgsType, Field } from '@nestjs/graphql'
import { IsString } from 'class-validator'

@ArgsType()
export class CreateQuizCardDTO {
  @Field({ nullable: false })
  @IsString()
  quizCardName: string

  @Field(type => [String], { nullable: 'items' })
  cards: string[]
}

@ArgsType()
export class UpdateQuizCardDTO {
  @Field({ description: 'quizCardId' })
  id: string

  @Field({ description: 'cardId' })
  cardId: string
}
