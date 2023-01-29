import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ID,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { UserService } from './user.service'
import UserModel from '@src/user/models/user.model'
import {
  UpdateUserInfoDTO,
  UpdateUserListsDTO,
} from '@src/user/models/user.dto'

@Resolver(() => UserModel)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => UserModel, { name: 'user' })
  async getUser(@Args('id', { type: () => ID }) id: string) {
    const user = await this.userService.getUser(id)
    return user
  }

  @Mutation(() => Boolean, { name: 'userByAttr' })
  async getUserByAttr(@Args('username') username: string) {
    const user = await this.userService.getUserByUserAttrs(username)
    return Boolean(user)
  }

  @Mutation(() => UserModel)
  async updateUser(@Args() updateUserData: UpdateUserInfoDTO) {
    const user = await this.userService.updateUserInfo(updateUserData)
    return user
  }

  @Mutation(() => UserModel)
  async pushToUserList(@Args() updateUserList: UpdateUserListsDTO) {
    const user = await this.userService.pushToUserList(updateUserList)
    return user
  }

  @Mutation(() => UserModel)
  async removeFromUserList(@Args() updateUserList: UpdateUserListsDTO) {
    const user = await this.userService.removeFromUserList(updateUserList)
    return user
  }

  @Mutation(() => UserModel)
  async deleteUser(@Args('id', { type: () => ID }) id: string) {
    const user = await this.userService.deleteUser(id)
    return user
  }
}
