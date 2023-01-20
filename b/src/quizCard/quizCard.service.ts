import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import QuizCardDB from '@src/quizCard/models/quizCard.schema'
import { Model, ObjectId } from 'mongoose'
import {
  CreateQuizCardDTO,
  UpdateQuizCardDTO,
} from '@src/quizCard/models/quizCard.dto'

@Injectable()
export default class QuizCardService {
  constructor(
    @InjectModel(QuizCardDB.name) private QuizCard: Model<QuizCardDB>,
  ) {}
  async createQuizCard(quizCardData: CreateQuizCardDTO) {
    const { quizCardName, cards } = quizCardData
    const quizCard = await this.QuizCard.create({
      quizCardName,
      cards: Array.from(new Set(cards)),
    })
    return quizCard
  }
  async addToQuizCard(quizCardData: UpdateQuizCardDTO) {
    const { cardId, id } = quizCardData
    const quizCard = await this.QuizCard.findByIdAndUpdate(id, {
      $addToSet: { cards: cardId },
    })
    return quizCard
  }

  async removeFromQuizCard(quizCardData: UpdateQuizCardDTO) {
    const { cardId, id } = quizCardData
    const quizCard = await this.QuizCard.findByIdAndUpdate(id, {
      $pull: { cards: cardId },
    })
    return quizCard
  }

  async deleteQuizCard(id: string) {
    const quizCard = await this.QuizCard.findByIdAndDelete(id)
    return quizCard
  }

  async findQuizCardById(id: string) {
    const quizCard = await this.QuizCard.findById(id)
    return quizCard
  }
}
