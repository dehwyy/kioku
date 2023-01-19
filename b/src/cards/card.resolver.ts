import Card from './models/card.model'
import { Args, ID, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import CardService from './card.service'
import CreateCarDTO from './models/DTO/createCardDTO'

@Resolver(of => Card)
export default class CardResolver {
  constructor(private cardService: CardService) {}

  @Query(returns => Card, { name: 'card' })
  async getCard(@Args('id', { type: () => ID }) id: string) {
    const card = await this.cardService.getCardById(id)
    return card
  }

  @Mutation(returns => Card, { name: 'deleteCard' })
  async deleteCard(@Args('id', { type: () => ID }) id: string) {
    const card = await this.cardService.deleteCardById(id)
    return card
  }

  @Mutation(returns => Card, { name: 'createCard' })
  async createCard(@Args() userData: CreateCarDTO) {
    const card = await this.cardService.createCard(userData)
    return card
  }
}
