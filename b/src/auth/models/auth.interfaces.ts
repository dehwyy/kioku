import * as mongoose from 'mongoose'

export abstract class LoginData {
  email: string
  password: string
}

export abstract class AuthDB {
  userId: mongoose.Types.ObjectId
  token: string
}
