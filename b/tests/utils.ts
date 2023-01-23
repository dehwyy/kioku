import request, { SuperTestGraphQL } from 'supertest-graphql'
import gql from 'graphql-tag'
import { INestApplication } from '@nestjs/common'

type cardDataType = { _id: string; face: string; backface: string }
type createCardReturnType<T extends string> = Record<T, cardDataType>
type createCardArgs = { face: string; backface: string; app: INestApplication }
export function createCard<T extends string>({
  face,
  backface,
  app,
}: createCardArgs): SuperTestGraphQL<createCardReturnType<T>, cardDataType> {
  return request<createCardReturnType<T>>(app.getHttpServer())
    .mutate(
      gql`
        mutation CreateCard($face: String!, $backface: String!) {
          createCard(backface: $backface, face: $face) {
            _id
            backface
            face
          }
        }
      `,
    )
    .variables({ face, backface })
}
export interface quizCardFields {
  _id: string
  quizCardName: string
  cards: cardDataType[]
}
type createQuizCardArgs = {
  cards: string[]
  quizCardName: string
  app: INestApplication
}
type createQuizCardReturnType<T extends string> = Record<T, quizCardFields>
export function createQuizCard({
  quizCardName,
  cards,
  app,
}: createQuizCardArgs): SuperTestGraphQL<
  createQuizCardReturnType<'createQuizCard'>,
  any
> {
  return request<createQuizCardReturnType<'createQuizCard'>>(
    app.getHttpServer(),
  )
    .mutate(
      gql`
        mutation CreateCard($cards: [String]!, $quizCardName: String!) {
          createQuizCard(cards: $cards, quizCardName: $quizCardName) {
            _id
            cards {
              _id
              backface
              face
            }
            quizCardName
          }
        }
      `,
    )
    .variables({ quizCardName, cards })
}
