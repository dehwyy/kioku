import request from 'supertest-graphql'
import gql from 'graphql-tag'
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { MainModule } from '@src/main.module'

type cardResponse = Record<string, { _id: string }>

describe('AppController (e2e)', () => {
  let app: INestApplication
  let id: string
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MainModule],
    }).compile()
    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('create card', async () => {
    const { data } = await request<cardResponse>(app.getHttpServer())
      .mutate(gql`
          mutation CreateCard($face: String!, $backface: String!) {
            createCard(backface: $backface, face: $face) {
              _id
              backface
              face
            }
          }`).variables({ face: 'test', backface: 'test' }).expectNoErrors()
    id = data.createCard._id
    expect(id).toBeTruthy()
  })
  it('update card', async () => {
    const { data } = await request<{updateCard: string}>(app.getHttpServer())
    .mutate(gql`
      mutation UpdateCard($backface: String!, $face: String!, $id: String!) {
          updateCard(backface: $backface, face: $face, id: $id)
      }
    `).variables({face: "test1", backface: "test1", id}).expectNoErrors()
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
        }`).variables({id: id}).expectNoErrors()
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
    `).variables({id}).expectNoErrors()
    expect(data.deleteCard).toBeTruthy()
  })
})
