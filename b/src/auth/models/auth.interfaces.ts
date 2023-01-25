import * as mongoose from 'mongoose'

export interface ILoginData {
  email: string
  password: string
}

export interface IAuthTokenDB {
  userId: mongoose.Types.ObjectId
  token: string
}
