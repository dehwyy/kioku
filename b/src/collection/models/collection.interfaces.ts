import QuizCardQL from '@src/quizCard/models/quizCard.model'

export interface ICollectionBase<T, P = string> {
  collectionName: string
  quizCards: T[]
  theme: string
  creator: string
  creatorId: P
}

export interface ICollectionQLResponse extends ICollectionBase<QuizCardQL> {
  _id: string
}

export interface IUpdateQuizCardRequest {
  id: string
  cardId: string
}
