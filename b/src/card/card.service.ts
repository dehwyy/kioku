import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import CardDB from './models/card.schema'
import { Model } from 'mongoose'
import { CreateCardDTO, UpdateCardDTO } from '@src/card/models/card.dto'

@Injectable()
export default class CardService {
  constructor(@InjectModel(CardDB.name) private CardModel: Model<CardDB>) {}
  async getCardById(id: string) {
    const card = await this.CardModel.findById(id)
    return card
  }

  async getCardsByIds(ids: string[]) {
    const cards = []
    for (const id of ids) {
      const card = await this.CardModel.findById(id)
      cards.push(card)
    }
    return cards
  }

  async deleteCardById(id: string) {
    const card = await this.CardModel.findByIdAndDelete(id)
    return card
  }

  async createCard(cardData: CreateCardDTO) {
    const card = await this.CardModel.create(cardData)
    return card
  }

  async updateCard(cardUpdateData: UpdateCardDTO) {
    const { id, face, backface } = cardUpdateData
    const card = await this.CardModel.findByIdAndUpdate(id, {
      $set: { face, backface },
    })
    return card
  }
}
