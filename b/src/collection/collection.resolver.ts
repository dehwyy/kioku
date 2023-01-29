import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import CollectionService from '@src/collection/collection.service'
import CollectionQL from '@src/collection/models/collection.model'
import {
  CreateCollectionDTO,
  UpdateCollectionDTO,
} from '@src/collection/models/collection.dto'
import QuizCardService from '@src/quizCard/quizCard.service'
import QuizCardQL from '@src/quizCard/models/quizCard.model'
import { UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '@src/auth/auth.guard'
import CardQL from '@src/card/models/card.model'
import { UpdateLikesDTO } from '@src/global/dto/like.dto'

@Resolver(() => CollectionQL)
export default class CollectionResolver {
  constructor(
    private collectionService: CollectionService,
    private quizCardsService: QuizCardService,
  ) {}

  @Query(() => CollectionQL, { name: 'collection' })
  async getCollection(@Args('id', { type: () => ID }) id: string) {
    const collection = this.collectionService.getCollectionById(id)
    return collection
  }
  @ResolveField('quizCards', returns => [QuizCardQL], { nullable: 'items' })
  async quizCardsFieldResolver(@Parent() collectionData: CreateCollectionDTO) {
    const { quizCards: ids } = collectionData
    const quizCards = await this.quizCardsService.findQuizByIds(ids)
    return quizCards
  }

  @Mutation(() => CollectionQL)
  async deleteCollection(@Args('id', { type: () => ID }) id: string) {
    const collection = this.collectionService.deleteCollection(id)
    return collection
  }

  @Mutation(() => String, { name: 'addToCollection' })
  async addToCollection(@Args() updateCollectionData: UpdateCollectionDTO) {
    const isModified =
      this.collectionService.addToCollection(updateCollectionData)
    return isModified
      ? `modified collection ${updateCollectionData.id}`
      : 'error'
  }

  @Mutation(() => String, { name: 'removeFromCollection' })
  async removeFromCollection(
    @Args() updateCollectionData: UpdateCollectionDTO,
  ) {
    const isModified =
      this.collectionService.removeFromCollection(updateCollectionData)
    return isModified
      ? `modified collection ${updateCollectionData.id}`
      : 'error'
  }

  @Mutation(() => CollectionQL, { name: 'createCollection' })
  async createCollection(@Args() createCollection: CreateCollectionDTO) {
    const collection = this.collectionService.createCollection(createCollection)
    return collection
  }

  @Mutation(returns => CardQL, { name: 'likeCard' })
  async updateCardLikes(@Args() cardLikesDTO: UpdateLikesDTO) {
    const card = await this.collectionService.addToLikes(cardLikesDTO)
    return card
  }

  @Mutation(returns => CardQL, { name: 'dislikeCard' })
  async updateCardDislikes(@Args() cardDislikesDTO: UpdateLikesDTO) {
    const card = await this.collectionService.removeFromLikes(cardDislikesDTO)
    return card
  }
}
