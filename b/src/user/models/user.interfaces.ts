import CardQL from '@src/card/models/card.model'
import QuizCardQL from '@src/quizCard/models/quizCard.model'
import CollectionQL from '@src/collection/models/collection.model'
import CardDB from '@src/card/models/card.schema'
import CollectionDB from '@src/collection/models/collection.schema'
import QuizCardDB from '@src/quizCard/models/quizCard.schema'

abstract class ExtraData {
  quizCards: Array<any>
  cards: Array<any>
  collections: Array<any>
}

export abstract class UserBasicData {
  username: string
  password: string
  email: string
}

export abstract class UserExtraQL implements ExtraData {
  quizCards: QuizCardQL[]
  cards: CardQL[]
  collections: CollectionQL[]
}

export abstract class UserExtraDB implements ExtraData {
  quizCards: QuizCardDB[]
  cards: CardDB[]
  collections: CollectionDB[]
}

export abstract class UserListsData implements ExtraData {
  quizCards: string[]
  cards: string[]
  collections: string[]
}

export abstract class UserFullDataQL implements UserBasicData, UserExtraQL {
  _id: string
  username: string
  password: string
  email: string
  quizCards: QuizCardQL[]
  cards: CardQL[]
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
  cards: string[]
  collections: string[]
}
