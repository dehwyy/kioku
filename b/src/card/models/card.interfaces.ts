import * as mongoose from 'mongoose'

export interface ICardRequest {
  face: string
  backface: string
}

export interface ICardDB extends ICardRequest {
  likes: mongoose.Types.ObjectId[]
}

export interface IUpdateCardLikes {
  id: string
  userId: string
}

export interface ICardQL extends ICardRequest {
  _id: string
}

export interface ICardUpdateRequest extends ICardRequest {
  id: string
}
