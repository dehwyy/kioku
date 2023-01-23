import { ArgsType, Field, ID } from '@nestjs/graphql'
import { IsString } from 'class-validator'

@ArgsType()
export class CreateUserDTO {
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
  cards: string[]

  @Field(type => [String], { nullable: 'items' })
  collections: string[]
}

@ArgsType()
export class UpdateUserInfo {
  @Field({ nullable: true })
  @IsString()
  username: string

  @Field({ nullable: true })
  @IsString()
  email: string

  @Field({ nullable: true })
  @IsString()
  password: string

  @Field(type => [String], { nullable: 'itemsAndList' })
  quizCards: string[]

  @Field(type => [String], { nullable: 'itemsAndList' })
  cards: string[]

  @Field(type => [String], { nullable: 'itemsAndList' })
  collections: string[]

  @Field(type => ID)
  id: string
}
