import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import CollectionDB from '@src/collection/models/collection.schema'
import { Model } from 'mongoose'
import {
  CreateCollectionDTO,
  UpdateCollectionDTO,
} from '@src/collection/models/collection.dto'

@Injectable()
export default class CollectionService {
  constructor(
    @InjectModel(CollectionDB.name) private Collection: Model<CollectionDB>,
  ) {}

  async getCollectionById(id: string) {
    const collection = await this.Collection.findById(id)
    return collection
  }

  async deleteCollection(id: string) {
    const collection = await this.Collection.findByIdAndDelete(id)
    return collection
  }

  async addToCollection(updateCollectionData: UpdateCollectionDTO) {
    const { cardId, id } = updateCollectionData
    const collection = await this.Collection.findByIdAndUpdate(id, {
      $addToSet: { quizCards: cardId },
    })
    return collection
  }

  async removeFromCollection(updateCollectionData: UpdateCollectionDTO) {
    const { cardId, id } = updateCollectionData
    const collection = await this.Collection.findByIdAndUpdate(id, {
      $pull: { quizCards: cardId },
    })
    return collection
  }

  async createCollection(collectionData: CreateCollectionDTO) {
    const collection = await this.Collection.create(collectionData)
    return collection
  }
}
