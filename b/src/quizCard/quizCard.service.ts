import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import QuizCardDB from '@src/quizCard/models/quizCard.schema'
import { Model } from 'mongoose'
import {
  CreateQuizCardDTO,
  UpdateQuizCardDTO,
} from '@src/quizCard/models/quizCard.dto'
import CardService from '@src/card/card.service'
import { UpdateLikesDTO } from '@src/global/dto/like.dto'

@Injectable()
export default class QuizCardService {
  constructor(
    @InjectModel(QuizCardDB.name) private QuizCard: Model<QuizCardDB>,
    private cardService: CardService,
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
  async findQuizByIds(ids: string[]) {
    const quizCards = []
    for (let id of ids) {
      const quizCard = await this.QuizCard.findById(id).populate('cards')
      quizCards.push(quizCard)
    }
    return quizCards
  }

  async addToLikes(cardNewLike: UpdateLikesDTO) {
    const { id, userId } = cardNewLike
    const quizCard = await this.QuizCard.findByIdAndUpdate(id, {
      $addToSet: { likes: userId },
    })
    return quizCard
  }

  async removeFromLikes(cardRemoveLike: UpdateLikesDTO) {
    const { id, userId } = cardRemoveLike
    const quizCard = await this.QuizCard.findByIdAndUpdate(id, {
      $pull: { likes: userId },
    })
    return quizCard
  }
}
