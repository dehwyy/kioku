import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql'
import { UserService } from './user.service'
import UserModel from '@src/user/models/user.model'
import {
  CreateUserDTO,
  UpdateUserInfoDTO,
  UpdateUserListsDTO,
} from '@src/user/models/user.dto'
import { UpdateUserLists } from '@src/user/models/user.interfaces'

@Resolver(() => UserModel)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => UserModel)
  async createUser(@Args() createUserInput: CreateUserDTO) {
    const user = await this.userService.create(createUserInput)
    return user
  }

  @Query(() => UserModel, { name: 'user' })
  async getUser(@Args('id', { type: () => ID }) id: string) {
    const user = this.userService.getUser(id)
    return user
  }

  @Mutation(() => UserModel)
  async updateUser(@Args() updateUserData: UpdateUserInfoDTO) {
    const user = await this.userService.updateUserInfo(updateUserData)
    return user
  }

  @Mutation(() => UserModel)
  async updateUserLists(@Args() updateUserList: UpdateUserListsDTO) {
    const user = await this.userService.updateUserLists(updateUserList)
    return user
  }

  @Mutation(() => UserModel)
  async deleteUser(@Args('id', { type: () => ID }) id: string) {
    const user = await this.userService.deleteUser(id)
    return user
  }
}
