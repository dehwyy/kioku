import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import CardDB from './models/card.schema'
import { Model } from 'mongoose'
import CreateCardDTO from './models/DTO/createCardDTO'

@Injectable()
export default class CardService {
  constructor(@InjectModel(CardDB.name) private cardModel: Model<CardDB>) {}
  async getCardById(id: string) {
    const card = await this.cardModel.findById(id)
    return card
  }

  async getCardsByIds(ids: string[]) {
    const cards = []
    for (const id of ids) {
      const card = await this.cardModel.findById(id)
      cards.push(card)
    }
    return cards
  }

  async deleteCardById(id: string) {
    const card = await this.cardModel.findByIdAndDelete(id)
    return card
  }

  async createCard(userData: CreateCardDTO) {
    const card = await this.cardModel.create(userData)
    return card
  }
}
