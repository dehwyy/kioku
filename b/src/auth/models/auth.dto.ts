import { ILoginData } from '@src/auth/models/auth.interfaces'
import { ArgsType, Field } from '@nestjs/graphql'

@ArgsType()
export class LoginRequest implements ILoginData {
  @Field({ nullable: false })
  password: string
  @Field({ nullable: false })
  email: string
}
