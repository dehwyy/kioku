import { Field, ObjectType } from '@nestjs/graphql'
import CardQL from '@src/card/models/card.model'
import QuizCardQL from '@src/quizCard/models/quizCard.model'
import CollectionQL from '@src/collection/models/collection.model'
import {
  UserBasicData,
  UserExtraQL,
  UserFullDataQL,
} from '@src/user/models/user.interfaces'

@ObjectType({ description: 'user model' })
class UserProto implements UserBasicData, UserExtraQL {
  @Field()
  password: string

  @Field()
  email: string

  @Field()
  username: string

  @Field(type => [CardQL], { nullable: 'items' })
  cards: CardQL[]

  @Field(type => [QuizCardQL], { nullable: 'items' })
  quizCards: QuizCardQL[]

  @Field(type => [CollectionQL], { nullable: 'items' })
  collections: CollectionQL[]
}

@ObjectType({ description: 'user model' })
export default class UserModel extends UserProto {
  @Field()
  _id: string
}

@ObjectType({ description: 'user model' })
class UserCreateUserQL extends UserProto {
  @Field({ nullable: false })
  userId: string
}

@ObjectType({ description: 'user model' })
export class UserCreateQL {
  @Field({ nullable: false })
  token: string
  @Field({ nullable: false })
  user: UserCreateUserQL
}
