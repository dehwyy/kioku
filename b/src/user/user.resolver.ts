import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql'
import { UserService } from './user.service'
import UserModel from '@src/user/models/user.model'
import { CreateUserDTO, UpdateUserInfo } from '@src/user/models/user.dto'

@Resolver(() => UserModel)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => UserModel)
  createUser(@Args() createUserInput: CreateUserDTO) {
    const user = this.userService.create(createUserInput)
    return user
  }

  @Query(() => UserModel, { name: 'user' })
  getUser(@Args('id', { type: () => ID }) id: string) {
    return this.userService.getUser(id)
  }

  @Mutation(() => UserModel)
  updateUser(@Args() updateUserInput: UpdateUserInfo) {
    const user = this.userService.updateUserInfo(updateUserInput)
    return user
  }

  @Mutation(() => UserModel)
  deleteUser(@Args('id', { type: () => ID }) id: string) {
    const user = this.userService.deleteUser(id)
    return user
  }
}
