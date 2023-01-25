import request from 'supertest-graphql'
import gql from 'graphql-tag'
import { INestApplication } from '@nestjs/common'
import { createCard, createMockModule, createQuizCard, deleteUserTest, quizCardFields, registerUserTest } from "./utils"

describe('quizCard e2e', () => {
  let app: INestApplication
  let id: string
  let idCard1: string
  let idCard2: string
  let jwtToken: string
  let userId: string
  beforeEach(async () => {
    app = await createMockModule()
  })
  it('register user', async () => {
    const {data} = await registerUserTest({app})
    const {token, user} = data.register
    userId = user._id
    jwtToken = token
  })
  it('create quizCard', async () => {
    const { data: dataCard1 } = await createCard<"createCard">({ face: 'test1', backface: 'test1', app, token: jwtToken })
    idCard1 = dataCard1.createCard._id
    const { data: dataCard2 } = await createCard<"createCard">({ face: 'test1', backface: 'test1', app, token: jwtToken })
    idCard2 = dataCard2.createCard._id
    const {data} = await createQuizCard({quizCardName: "test11", cards: [idCard1], app, token: jwtToken})
    id = data.createQuizCard._id
    expect(data.createQuizCard._id).toBeTruthy()
    expect(data.createQuizCard.cards).toBeTruthy()
    expect(data.createQuizCard.cards).toBeTruthy()
  })
  it("add to quizCard", async () => {
    const { data } = await request<Record<"addToQuizCard", string>>(app.getHttpServer()).mutate(gql`
        mutation addToQuizCard($cardId: String!, $id: String!) {
            addToQuizCard(cardId: $cardId, id: $id)
        }
    `).variables({cardId: idCard2, id}).set('authorization', `Bearer ${jwtToken}`)
    expect(data.addToQuizCard).toMatch(/modified/i)
  })
  it("get quizCard", async () => {
    const {data} = await request<Record<"quizCard", quizCardFields>>(app.getHttpServer()).query(gql`
        query getQuizCard($id: ID!) {
            quizCard(id: $id) {
                quizCardName
                _id
                cards {
                    backface
                    face
                    _id
                }
            }
        }
    `).variables({id}).set('authorization', `Bearer ${jwtToken}`)
    expect(data.quizCard._id).toBeTruthy()
    expect(data.quizCard.quizCardName).toBeTruthy()
    expect(data.quizCard.cards).toBeTruthy()
    expect(data.quizCard.cards.length).toBe(2)
  })
  it("remove from quizCard", async () => {
    const {data} = await request<Record<"removeFromQuizCard", string>>(app.getHttpServer()).mutate(gql`
        mutation removeFromQuizCard($cardId: String!, $id: String!) {
            removeFromQuizCard(cardId: $cardId, id: $id)
        }
    `).variables({cardId: idCard2, id}).set('authorization', `Bearer ${jwtToken}`)
    expect(data.removeFromQuizCard).toMatch(/modified/i)
  })

  it("delete quizCard", async () => {
    const {data} = await request<Record<"deleteQuizCard", quizCardFields>>(app.getHttpServer()).mutate(gql`
        mutation deleteQuizCard($id: ID!) {
            deleteQuizCard(id: $id) {
                quizCardName
                cards {
                    face
                    backface
                    _id
                }
                _id
            }
        }
    `).variables({id}).set('authorization', `Bearer ${jwtToken}`)
    expect(data.deleteQuizCard._id).toBeTruthy()
    expect(data.deleteQuizCard.quizCardName).toBeTruthy()
    expect(data.deleteQuizCard.cards).toBeTruthy()
    expect(data.deleteQuizCard.cards.length).toBe(1)
  })
  it('delete user', async () => {
    const {data} = await deleteUserTest({app, token: jwtToken, id: userId})
    expect(data).toBeTruthy()
  })
})
