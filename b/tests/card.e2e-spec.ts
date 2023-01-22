import request from 'supertest-graphql'
import gql from 'graphql-tag'
import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import CardDB from '@src/card/models/card.schema'
import { MainModule } from '@src/main.module'

describe('AppController (e2e)', () => {
  let app: INestApplication
  const cardModel = {
    _id: 'someRandomString',
    backface: 'backface111',
    face: 'face',
  }

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MainModule],
    }).compile()
    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('create card', async () => {
    const { data } = await request(app.getHttpServer())
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
      .variables({ face: 'face1231233', backface: 'backface' })
    console.log(data)
    return
  })
})
