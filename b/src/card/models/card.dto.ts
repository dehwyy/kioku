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

@ArgsType()
export class UpdateCardDTO extends CreateCardDTO {
  @Field({ nullable: false })
  @IsString()
  id: string
}
