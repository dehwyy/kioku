import request, { SuperTestGraphQL } from 'supertest-graphql'
import gql from 'graphql-tag'
import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { MainModule } from '@src/main.module'

type cardDataType = { _id: string; face: string; backface: string }
type createCardReturnType<T extends string> = Record<T, cardDataType>
type createCardArgs = {
  face: string
  backface: string
  app: INestApplication
  token: string
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
  token: string
}
type createQuizCardReturnType<T extends string> = Record<T, quizCardFields>
export interface collectionResponse {
  _id: string
  collectionName: string
  quizCards: quizCardFields[]
}
export function createCard<T extends string>({
  face,
  backface,
  app,
  token,
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
    .set('authorization', `Bearer ${token}`)
}

export function createQuizCard({
  quizCardName,
  cards,
  app,
  token,
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
    .set('authorization', `Bearer ${token}`)
}

export const registerUserTest = async ({ app }: { app: INestApplication }) => {
  return request<
    Record<
      'register',
      { token: string; user: { password: string; email: string; _id: string } }
    >
  >(app.getHttpServer()).mutate(
    gql`
      mutation {
        register(
          cards: []
          quizCards: []
          collections: []
          email: "testUser"
          username: "testUser"
          password: "testUser"
        ) {
          token
          user {
            _id
            email
            password
          }
        }
      }
    `,
  )
}
export const deleteUserTest = async ({
  app,
  token,
  id,
}: {
  app: INestApplication
  id: string
  token: string
}) => {
  return request<
    Record<'deleteUser', { password: string; email: string; _id: string }>
  >(app.getHttpServer())
    .mutate(
      gql`
        mutation deleteUser($id: ID!) {
          deleteUser(id: $id) {
            email
            _id
            password
          }
        }
      `,
    )
    .variables({ id })
    .set('authorization', `Bearer ${token}`)
}

export const createMockModule = async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [MainModule],
  }).compile()
  const app = moduleFixture.createNestApplication()
  await app.init()
  return app
}
