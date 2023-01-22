import request, { SuperTestGraphQL } from 'supertest-graphql'
import gql from 'graphql-tag'
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { MainModule } from '@src/main.module'
import { createCard, createQuizCard } from "./utils"




describe('quizCard e2e', () => {
  let app: INestApplication
  let id: string
  let idCard1: string
  let idCard2: string
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MainModule],
    }).compile()
    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('create card', async () => {
    const { data: dataCard1 } = await createCard<"createCard">({ face: 'test1', backface: 'test1', app })
    idCard1 = dataCard1.createCard._id
    const { data: dataCard2 } = await createCard<"createCard">({ face: 'test1', backface: 'test1', app })
    idCard1 = dataCard2.createCard._id
    const {data} = await createQuizCard({quizCardName: "test11", cards: [idCard1, idCard2], app})
    expect(data.createQuizCard._id).toBeTruthy()
    expect(data.createQuizCard.cards).toBeTruthy()
    expect(data.createQuizCard.cards).toBeTruthy()
  })
})
