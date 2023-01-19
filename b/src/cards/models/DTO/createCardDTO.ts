import CardInputType from '../card.it'
import { IsString } from 'class-validator'
import { ArgsType, Field } from '@nestjs/graphql'

@ArgsType()
export default class CreateCarDTO implements CardInputType {
  @Field({ nullable: false })
  @IsString()
  backface: string

  @Field({ nullable: false })
  @IsString()
  face: string
}
