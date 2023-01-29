import { ArgsType, Field, ID } from '@nestjs/graphql'
import { IsString } from 'class-validator'
import {
  UpdateUserLists,
  UserBasicData,
  UserListsData,
} from '@src/user/models/user.interfaces'

@ArgsType()
export class CreateUserDTO implements UserBasicData, UserListsData {
  @Field()
  @IsString()
  username: string

  @Field()
  @IsString()
  email: string

  @Field()
  @IsString()
  password: string

  @Field(type => [String], { nullable: 'items' })
  quizCards: string[]

  @Field(type => [String], { nullable: 'items' })
  collections: string[]
}

@ArgsType()
export class UpdateUserListsDTO implements UpdateUserLists {
  @Field(type => [String], { nullable: 'itemsAndList' })
  quizCards: string[]

  @Field(type => [String], { nullable: 'itemsAndList' })
  collections: string[]

  @Field(type => ID)
  id: string
}

@ArgsType()
export class UpdateUserInfoDTO implements UpdateUserInfoDTO {
  @Field({ nullable: true })
  @IsString()
  username: string

  @Field({ nullable: true })
  @IsString()
  email: string

  @Field({ nullable: true })
  @IsString()
  password: string

  @Field(type => ID)
  id: string
}
