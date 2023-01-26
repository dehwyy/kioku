import CardQL from './models/card.model'
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql'
import CardService from './card.service'
import { CreateCardDTO, UpdateCardDTO } from '@src/card/models/card.dto'
import { UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '@src/auth/auth.guard'
import { UpdateLikesDTO } from '@src/global/dto/like.dto'

@UseGuards(JwtAuthGuard)
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
  async createCard(@Args() cardData: CreateCardDTO) {
    const card = await this.cardService.createCard(cardData)
    return card
  }

  @Mutation(returns => String, { name: 'updateCard' })
  async updateCard(@Args() updateCardData: UpdateCardDTO) {
    const isModified = await this.cardService.updateCard(updateCardData)
    return isModified ? `Modified card ${updateCardData.id}` : 'error'
  }

  @Mutation(returns => CardQL, { name: 'likeCard' })
  async updateCardLikes(@Args() cardLikesDTO: UpdateLikesDTO) {
    const card = await this.cardService.addToLikes(cardLikesDTO)
    return card
  }

  @Mutation(returns => CardQL, { name: 'dislikeCard' })
  async updateCardDislikes(@Args() cardDislikesDTO: UpdateLikesDTO) {
    const card = await this.cardService.removeFromLikes(cardDislikesDTO)
    return card
  }
}
