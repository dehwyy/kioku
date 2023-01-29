import { Injectable } from '@nestjs/common'
import {
  CreateUserDTO,
  UpdateUserInfoDTO,
  UpdateUserListsDTO,
} from '@src/user/models/user.dto'
import { InjectModel } from '@nestjs/mongoose'
import UserDB from '@src/user/models/user.schema'
import { Model } from 'mongoose'

@Injectable()
export class UserService {
  constructor(@InjectModel(UserDB.name) private User: Model<UserDB>) {}
  async create(createUserInput: CreateUserDTO) {
    const user = await this.User.create(createUserInput)
    return user
  }

  async getUser(id: string) {
    const user = await this.User.findById(id)
      .populate('collections')
      .populate('quizCards')
      .populate({ path: 'cards', select: 'face' })
    console.log(user)
    return user
  }
  async getUserByUserAttrs(email: string) {
    const user = await this.User.findOne({ email })
    return user
  }
  async updateUserInfo(updateUserInfo: Partial<UpdateUserInfoDTO>) {
    const { id, ...newUserInfo } = updateUserInfo
    const user = this.User.findByIdAndUpdate(updateUserInfo.id, {
      $set: newUserInfo,
    })
    return user
  }

  async pushToUserList(updateUserLists: Partial<UpdateUserListsDTO>) {
    const { id, ...newUserListsData } = updateUserLists
    const user = await this.User.findByIdAndUpdate(id, {
      $addToSet: newUserListsData,
    })
    return user
  }
  async removeFromUserList(updateUserLists: Partial<UpdateUserListsDTO>) {
    const { id, ...newUserListsData } = updateUserLists
    const user = await this.User.findByIdAndUpdate(id, {
      $pullAll: newUserListsData,
    })
    return user
  }

  async deleteUser(id: string) {
    const user = await this.User.findByIdAndDelete(id)
    return user
  }
}
