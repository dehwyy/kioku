import { CardInputType } from '../card.ab'
import { IsString } from 'class-validator'
import { ArgsType, Field } from '@nestjs/graphql'

@ArgsType()
export default class CreateCardDTO implements CardInputType {
  @Field({ nullable: false })
  @IsString()
  backface: string

  @Field({ nullable: false })
  @IsString()
  face: string
}
