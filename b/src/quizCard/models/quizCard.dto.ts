import { ArgsType, Field } from '@nestjs/graphql'
import { IsString } from 'class-validator'

@ArgsType()
export class CreateQuizCardDTO {
  @Field({ nullable: false })
  @IsString()
  quizCardName: string

  @Field(type => [String])
  cards: string[]
}

@ArgsType()
export class UpdateQuizCardDTO {
  @Field({ description: 'quizCardId' })
  @IsString()
  _id: string

  @Field({ description: 'cardId' })
  @IsString()
  cardId: string
}
