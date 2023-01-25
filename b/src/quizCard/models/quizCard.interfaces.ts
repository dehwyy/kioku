import CardQL from '@src/card/models/card.model'

export interface IQuizCardBase<T> {
  quizCardName: string
  cards: T[]
}

export interface IQuizCardQLResponse extends IQuizCardBase<CardQL> {
  _id: string
}

export interface IUpdateCardRequest {
  id: string
  cardId: string
}
