import { Injectable } from '@nestjs/common'
import { CreateUserDTO, UpdateUserInfo } from '@src/user/models/user.dto'
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
    return user
  }

  async updateUserInfo(updateUserInput: Partial<UpdateUserInfo>) {
    const s = updateUserInput
    // "s" is just an alias
    const plainPayload = {} as typeof s
    if (s.email) plainPayload.email = s.email
    if (s.password) plainPayload.password = s.password
    if (s.username) plainPayload.username = s.username
    const arrayPayload = {} as typeof s
    if (s.collections) arrayPayload.collections = s.collections
    if (s.cards) arrayPayload.cards = s.cards
    if (s.quizCards) arrayPayload.quizCards = s.quizCards
    // here we're split plain data like username and array data, whose we should not restore but push to set
    const user = this.User.findByIdAndUpdate(updateUserInput.id, {
      $set: { ...plainPayload },
      $addToSet: { ...arrayPayload },
    })
    return user
  }

  async deleteUser(id: string) {
    const user = await this.User.findByIdAndDelete(id)
    return user
  }
}
