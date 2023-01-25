import QuizCardQL from '@src/quizCard/models/quizCard.model'

export interface ICollectionBase<T> {
  collectionName: string
  quizCards: T[]
}

export interface ICollectionQLResponse extends ICollectionBase<QuizCardQL> {
  _id: string
}

export interface IUpdateQuizCardRequest {
  id: string
  cardId: string
}
