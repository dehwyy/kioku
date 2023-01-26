import { IsString } from 'class-validator'
import { ArgsType, Field } from '@nestjs/graphql'
import {
  ICardRequest,
  ICardUpdateRequest,
  IUpdateCardLikes,
} from '@src/card/models/card.interfaces'

@ArgsType()
export class CreateCardDTO implements ICardRequest {
  @Field({ nullable: false })
  @IsString()
  backface: string

  @Field({ nullable: false })
  @IsString()
  face: string
}

@ArgsType()
export class UpdateCardLikesDTO implements IUpdateCardLikes {
  @Field({ nullable: false })
  id: string
  @Field({ nullable: false })
  userId: string
}

@ArgsType()
export class UpdateCardDTO extends CreateCardDTO implements ICardUpdateRequest {
  @Field({ nullable: false })
  id: string
}
