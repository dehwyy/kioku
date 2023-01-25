import request from 'supertest-graphql'
import gql from 'graphql-tag'
import { INestApplication } from '@nestjs/common'
import { createCard, createMockModule, deleteUserTest, registerUserTest } from "./utils"

type cardResponse = Record<string, { _id: string }>

describe('card e2e', () => {
  let app: INestApplication
  let id: string
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

  it('create card', async () => {
    const { data } = await createCard<"createCard">({ face: 'test', backface: 'test', app, token: jwtToken }).expectNoErrors()
    id = data.createCard._id
    expect(id).toBeTruthy()
  })
  it('update card', async () => {
    const { data } = await request<{updateCard: string}>(app.getHttpServer())
    .mutate(gql`
      mutation UpdateCard($backface: String!, $face: String!, $id: String!) {
          updateCard(backface: $backface, face: $face, id: $id)
      }
    `).variables({face: "test1", backface: "test1", id}).set('authorization', `Bearer ${jwtToken}`).expectNoErrors()
    expect(data.updateCard).toMatch(/Modified/i)
  })
  it('get card', async () => {
    const { data } = await request<cardResponse>(app.getHttpServer())
    .query (gql`
        query CreateCard($id: ID!) {
            card(id: $id) {
                _id
                backface
                face
            }
        }`).variables({id: id}).expectNoErrors().set('authorization', `Bearer ${jwtToken}`)
    id = data.card._id
    expect(id).toBeTruthy()
  })
  it('delete card', async () => {
    const { data } = await request<cardResponse>(app.getHttpServer())
    .mutate(gql`
        mutation deleteCard($id: ID!) {
            deleteCard(id: $id) {
                face
                backface
                _id
            }
        }
    `).variables({id}).set('authorization', `Bearer ${jwtToken}`).expectNoErrors()
    expect(data.deleteCard).toBeTruthy()
  })
  it('delete user', async () => {
    const res = await deleteUserTest({app, token: jwtToken, id: userId})
    const {data} = res
  })
})
