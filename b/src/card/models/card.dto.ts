import { IsString } from 'class-validator'
import { ArgsType, Field } from '@nestjs/graphql'
import {
  ICardResponse,
  ICardUpdateRequest,
} from '@src/card/models/card.interfaces'

@ArgsType()
export class CreateCardDTO implements ICardResponse {
  @Field({ nullable: false })
  @IsString()
  backface: string

  @Field({ nullable: false })
  @IsString()
  face: string
}

@ArgsType()
export class UpdateCardDTO extends CreateCardDTO implements ICardUpdateRequest {
  @Field({ nullable: false })
  id: string
}
