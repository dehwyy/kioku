import { Test, TestingModule } from '@nestjs/testing'
import CardResolver from '@src/card/card.resolver'
import CardService from '@src/card/card.service'
import { MongooseModule } from '@nestjs/mongoose'
import CardDB, { CardSchema } from '@src/card/models/card.schema'

describe('card gql', () => {
  let gql: CardResolver
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CardResolver, CardService],
    })
      .overrideProvider(CardService)
      .useValue({})
      .compile()
    gql = module.get<CardResolver>(CardResolver)
  })
  it('create card', () => {
    expect(gql).toBeDefined()
  })
})
