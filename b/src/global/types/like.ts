import mongoose from 'mongoose'

export interface IUpdateLikes {
  id: string
  userId: string
}

//@ts-ignore I don't get why <error> appears here
export interface IModelWithLikesDB<T extends object> extends T {
  likes: mongoose.Types.ObjectId[]
}
//@ts-ignore I don't get why <error> appears here
export interface IModelWithLikesQL<T extends object> extends T {
  _id: string
  likes: string[]
}
