import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { LoginRequest } from '@src/auth/models/auth.dto'
import { AuthService } from '@src/auth/auth.service'
import { UserCreateQL } from '@src/user/models/user.model'
import { CreateUserDTO } from '@src/user/models/user.dto'

@Resolver(() => UserCreateQL)
export class AuthResolver {
  constructor(private authService: AuthService) {}
  @Mutation(() => UserCreateQL)
  async login(@Args() loginRequest: LoginRequest) {
    const userData = await this.authService.login(loginRequest)
    return userData
  }

  @Mutation(() => UserCreateQL)
  async register(@Args() createUserInput: CreateUserDTO) {
    console.log(createUserInput)
    const user = await this.authService.register(createUserInput)
    return user
  }
}
