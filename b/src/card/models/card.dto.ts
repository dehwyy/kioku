import { IsString } from 'class-validator'
import { ArgsType, Field } from '@nestjs/graphql'

export abstract class CardInputType {
  face: string
  backface: string
}

@ArgsType()
export class CreateCardDTO implements CardInputType {
  @Field({ nullable: false })
  @IsString()
  backface: string

  @Field({ nullable: false })
  @IsString()
  face: string
}
