import { Field, InputType } from '@nestjs/graphql'
import { CardOutputType } from '@src/card/models/card.ab'

@InputType()
export default class GetCardDTO implements CardOutputType {
  @Field()
  backface: string
  @Field()
  face: string
  @Field()
  _id: string
}
