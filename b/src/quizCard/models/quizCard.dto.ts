import { ArgsType, Field } from '@nestjs/graphql'
import { IsString } from 'class-validator'
import {
  IQuizCardBase,
  IUpdateCardRequest,
} from '@src/quizCard/models/quizCard.interfaces'

@ArgsType()
export class CreateQuizCardDTO implements IQuizCardBase<string> {
  @Field({ nullable: false })
  @IsString()
  quizCardName: string

  @Field(type => [String], { nullable: 'items' })
  cards: string[]
}

@ArgsType()
export class UpdateQuizCardDTO implements IUpdateCardRequest {
  @Field({ description: 'quizCardId' })
  id: string

  @Field({ description: 'cardId' })
  cardId: string
}
