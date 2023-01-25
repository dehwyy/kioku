import request from 'supertest-graphql'
import gql from 'graphql-tag'
import { INestApplication } from '@nestjs/common'
import {
  collectionResponse,
  createCollection,
  createMockModule,
  createQuizCard,
  deleteUserTest,
  registerUserTest,
} from "./utils"



describe('collection e2e', () => {
  let app: INestApplication
  let id: string
  let userId: string
  let idQuizCard1: string
  let idQuizCard2: string
  let jwtToken: string
  beforeEach(async () => {
    app = await createMockModule()
  })
  it('register user', async () => {
    const {data} = await registerUserTest({app})
    const {token, user} = data.register
    userId = user._id
    jwtToken = token
  })
  it('create collection', async () => {
    const { data: dataCard1 } = await createQuizCard({ app, quizCardName: "test111", cards: [], token: jwtToken })
    idQuizCard1 = dataCard1.createQuizCard._id
    const { data: dataCard2 } = await createQuizCard({ app, quizCardName: 'test222', cards: [], token: jwtToken })
    idQuizCard2 = dataCard2.createQuizCard._id
    const {data} = await createCollection({app, token: jwtToken, idQuizCard1})
    id = data.createCollection._id
    expect(data.createCollection._id).toBeTruthy()
    expect(data.createCollection.quizCards).toBeTruthy()
    expect(data.createCollection.collectionName).toBeTruthy()
  })
  it("add to collection", async () => {
    const { data } = await request<Record<"addToCollection", string>>(app.getHttpServer()).mutate(gql`
        mutation addToQuizCard($cardId: String!, $id: String!) {
            addToCollection(cardId: $cardId, id: $id)
        }
    `).variables({cardId: idQuizCard2, id}).set('authorization', `Bearer ${jwtToken}`)
    expect(data.addToCollection).toMatch(/modified/i)
  })
  it("get quizCard", async () => {
    const {data} = await request<Record<"collection", collectionResponse>>(app.getHttpServer()).query(gql`
        query getCollection($id: ID!) {
            collection(id: $id) {
                quizCards {
                    _id
                }
                collectionName
                _id
            }
        }
    `).variables({id}).set('authorization', `Bearer ${jwtToken}`)
    expect(data.collection._id).toBeTruthy()
    expect(data.collection.collectionName).toBeTruthy()
    expect(data.collection.quizCards).toBeTruthy()
    expect(data.collection.quizCards.length).toBe(2)
  })
  it("remove from collection", async () => {
    const {data} = await request<Record<"removeFromCollection", string>>(app.getHttpServer()).mutate(gql`
        mutation removeFromCollection($cardId: String!, $id: String!) {
            removeFromCollection(cardId: $cardId, id: $id)
        }
    `).variables({cardId: idQuizCard2, id}).set('authorization', `Bearer ${jwtToken}`)
    expect(data.removeFromCollection).toMatch(/modified/i)
  })

  it("delete collection", async () => {
    const {data} = await request<Record<"deleteCollection", collectionResponse>>(app.getHttpServer()).mutate(gql`
        mutation deleteCollection($id: ID!) {
            deleteCollection(id: $id) {
                collectionName
                quizCards {
                    _id
                }
                _id
            }
        }
    `).variables({id}).set('authorization', `Bearer ${jwtToken}`)
    expect(data.deleteCollection._id).toBeTruthy()
    expect(data.deleteCollection.collectionName).toBeTruthy()
    expect(data.deleteCollection.quizCards).toBeTruthy()
    expect(data.deleteCollection.quizCards.length).toBe(1)
  })
  it('delete user', async () => {
    const {data} = await deleteUserTest({app, token: jwtToken, id: userId})
    expect(data).toBeTruthy()
  })
})
