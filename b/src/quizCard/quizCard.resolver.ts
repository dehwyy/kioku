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
import CreateQuizCardDTO from './models/DTO/createQuizCardDTO'
import QuizCardService from './quizCard.service'
import UpdateQuizCardDTO from '@src/quizCard/models/DTO/updateQuizCardDTO'
import CardQL from '@src/card/models/card.model'
import CardService from '@src/card/card.service'

@Resolver(of => QuizCard)
export default class QuizCardResolver {
  constructor(
    private quizCardService: QuizCardService,
    private CardService: CardService,
  ) {}

  @Mutation(returns => QuizCard, { name: 'createQuizCard' })
  async createQuizCard(@Args() quizCardData: CreateQuizCardDTO) {
    const quizCard = await this.quizCardService.createQuizCard(quizCardData)
    return quizCard
  }
  @Mutation(returns => String, { name: 'addToQuizCard' })
  async addToQuizCard(@Args() quizCardData: UpdateQuizCardDTO) {
    const isModified = await this.quizCardService.addToQuizCard(quizCardData)
    return isModified ? `modified ${quizCardData.cardId}` : 'error'
  }

  @Mutation(returns => String, { name: 'removeFromQuizCard' })
  async removeFromQuizCard(@Args() quizCardData: UpdateQuizCardDTO) {
    const isModified = await this.quizCardService.removeFromQuizCard(
      quizCardData,
    )
    return isModified ? `modified ${quizCardData.cardId}` : 'error'
  }

  @Mutation(returns => QuizCard, { name: 'deleteQuizCard' })
  async deleteQuizCard(@Args('id', { type: () => ID }) quizCardId: string) {
    const quizCard = await this.quizCardService.deleteQuizCard(quizCardId)
    return quizCard
  }

  @Query(returns => QuizCard, { name: 'quizCard' })
  async getQuizCard(@Args('id', { type: () => ID }) quizCardId: string) {
    const quizCard = await this.quizCardService.findQuizCardById(quizCardId)
    return quizCard
  }

  @ResolveField('cards', returns => [CardQL])
  async getCardsById(@Parent() quizCardData: CreateQuizCardDTO) {
    const { cards: ids } = quizCardData
    const cards = this.CardService.getCardsByIds(ids)
    return cards
  }
}