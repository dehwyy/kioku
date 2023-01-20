import { ArgsType, Field } from '@nestjs/graphql'
import { IsString } from 'class-validator'

@ArgsType()
export default class CreateQuizCardDTO {
  @Field({ nullable: false })
  @IsString()
  quizCardName: string

  @Field(type => [String])
  cards: string[]
}
