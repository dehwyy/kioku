import CardQL from './models/card.model'
import { Args, ID, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import CardService from './card.service'
import { CreateCardDTO } from '@src/card/models/card.dto'

@Resolver(of => CardQL)
export default class CardResolver {
  constructor(private cardService: CardService) {}

  @Query(returns => CardQL, { name: 'card' })
  async getCard(@Args('id', { type: () => ID }) id: string) {
    const card = await this.cardService.getCardById(id)
    return card
  }

  @Mutation(returns => CardQL, { name: 'deleteCard' })
  async deleteCard(@Args('id', { type: () => ID }) id: string) {
    const card = await this.cardService.deleteCardById(id)
    return card
  }

  @Mutation(returns => CardQL, { name: 'createCard' })
  async createCard(@Args() userData: CreateCardDTO) {
    const card = await this.cardService.createCard(userData)
    return card
  }
}
