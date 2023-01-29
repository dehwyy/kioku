import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import QuizCard from './models/quizCard.model'
import QuizCardService from './quizCard.service'
import {
  UpdateQuizCardDTO,
  CreateQuizCardDTO,
} from '@src/quizCard/models/quizCard.dto'
import CardQL from '@src/card/models/card.model'
import CardService from '@src/card/card.service'
import { UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '@src/auth/auth.guard'
import { UpdateLikesDTO } from '@src/global/dto/like.dto'

@Resolver(of => QuizCard)
export default class QuizCardResolver {
  constructor(
    private quizCardService: QuizCardService,
    private CardService: CardService,
  ) {}

  @Query(returns => QuizCard, { name: 'quizCard' })
  async getQuizCard(@Args('id', { type: () => ID }) quizCardId: string) {
    const quizCard = await this.quizCardService.findQuizCardById(quizCardId)
    return quizCard
  }

  @ResolveField('cards', returns => [CardQL], { nullable: 'items' })
  async getCardsById(@Parent() quizCardData: CreateQuizCardDTO) {
    const { cards: ids } = quizCardData
    const cards = await this.CardService.getCardsByIds(ids)
    return cards
  }
  @Mutation(returns => String)
  async removeFromQuizCard(@Args() quizCardData: UpdateQuizCardDTO) {
    const isModified = await this.quizCardService.removeFromQuizCard(
      quizCardData,
    )
    return isModified ? `modified ${quizCardData.cardId}` : 'error'
  }

  @Mutation(returns => QuizCard)
  async createQuizCard(@Args() quizCardData: CreateQuizCardDTO) {
    const quizCard = await this.quizCardService.createQuizCard(quizCardData)
    return quizCard
  }

  @Mutation(returns => String)
  async addToQuizCard(@Args() quizCardData: UpdateQuizCardDTO) {
    const isModified = await this.quizCardService.addToQuizCard(quizCardData)
    return isModified ? `modified ${quizCardData.cardId}` : 'error'
  }

  @Mutation(returns => QuizCard)
  async deleteQuizCard(@Args('id', { type: () => ID }) quizCardId: string) {
    const quizCard = await this.quizCardService.deleteQuizCard(quizCardId)
    return quizCard
  }

  @Mutation(returns => CardQL, { name: 'likeCard' })
  async updateCardLikes(@Args() cardLikesDTO: UpdateLikesDTO) {
    const card = await this.quizCardService.addToLikes(cardLikesDTO)
    return card
  }

  @Mutation(returns => CardQL, { name: 'dislikeCard' })
  async updateCardDislikes(@Args() cardDislikesDTO: UpdateLikesDTO) {
    const card = await this.quizCardService.removeFromLikes(cardDislikesDTO)
    return card
  }
}

//Занимаюсь программированием. Основной стэк - фуллстак веб-разработка (предпочитаю typescript) : писал на React, Vue, Next, Express, Nest; работал с sequelize(pgsql), mongoose, websocket, Canvas, Redux(rtk), MobX, VueX, pinia; знаю огромное количество сторонних библиотек(тестирование, стилизация компонентов, axios, rtk query,  apollo,  secure JWT, passportjs auth,  конфиги - eslint, prettier, vite, esbuild, webpack, ). Знаком с основами компьютерных сетей(протоколы, модели). Дополнительно знаю Python, https://github.com/dehwyy
