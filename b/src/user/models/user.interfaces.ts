import QuizCardQL from '@src/quizCard/models/quizCard.model'
import CollectionQL from '@src/collection/models/collection.model'
import CollectionDB from '@src/collection/models/collection.schema'
import QuizCardDB from '@src/quizCard/models/quizCard.schema'

abstract class ExtraData {
  quizCards: Array<any>
  collections: Array<any>
}

export abstract class UserBasicData {
  username: string
  password: string
  email: string
}

export abstract class UserExtraQL implements ExtraData {
  quizCards: QuizCardQL[]
  collections: CollectionQL[]
}

export abstract class UserExtraDB {
  quizCards: QuizCardDB[]
  collections: CollectionDB[]
}

export abstract class UserListsData implements ExtraData {
  quizCards: string[]
  collections: string[]
}

export abstract class UserFullDataQL implements UserBasicData, UserExtraQL {
  _id: string
  username: string
  password: string
  email: string
  quizCards: QuizCardQL[]
  collections: CollectionQL[]
}

export abstract class UpdateUserInfo implements UserBasicData {
  id: string
  username: string
  password: string
  email: string
}

export abstract class UpdateUserLists implements UserListsData {
  id: string
  quizCards: string[]
  collections: string[]
}
