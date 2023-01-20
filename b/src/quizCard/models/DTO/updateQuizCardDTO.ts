import { ArgsType, Field } from '@nestjs/graphql'
import { IsString } from 'class-validator'

@ArgsType()
export default class UpdateQuizCardDTO {
  @Field({ description: 'quizCardId' })
  @IsString()
  _id: string

  @Field({ description: 'cardId' })
  @IsString()
  cardId: string
}
