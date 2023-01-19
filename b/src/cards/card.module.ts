import { Module } from '@nestjs/common'
import CardResolver from './card.resolver'
import { MongooseModule } from '@nestjs/mongoose'
import CardModel, { CardSchema } from './models/card.schema'
import CardService from './card.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CardModel.name, schema: CardSchema }]),
  ],
  providers: [CardResolver, CardService],
})
export default class CardModule {}
