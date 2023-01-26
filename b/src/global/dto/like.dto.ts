import { ArgsType, Field } from '@nestjs/graphql'
import { IUpdateLikes } from '@src/global/types/like'

@ArgsType()
export class UpdateLikesDTO implements IUpdateLikes {
  @Field({ nullable: false })
  id: string
  @Field({ nullable: false })
  userId: string
}
