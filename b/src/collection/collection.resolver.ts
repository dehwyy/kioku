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
import { BadRequestException, HttpException, HttpStatus } from '@nestjs/common'

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

  @Mutation(() => CollectionQL, { name: 'deleteCollection' })
  async deleteCollection(@Args('id', { type: () => ID }) id: string) {
    const collection = this.collectionService.deleteCollection(id)
    return collection
  }

  @Mutation(() => String, { name: 'addToCollection' })
  async addToCollection(@Args() updateCollectionData: UpdateCollectionDTO) {
    const isModified =
      this.collectionService.addToCollection(updateCollectionData)
    return isModified ? `collection ${updateCollectionData.id}` : 'error'
  }

  @Mutation(() => String, { name: 'removeFromCollection' })
  async removeFromCollection(
    @Args() updateCollectionData: UpdateCollectionDTO,
  ) {
    const isModified =
      this.collectionService.removeFromCollection(updateCollectionData)
    return isModified ? `collection ${updateCollectionData.id}` : 'error'
  }

  @Mutation(() => CollectionQL, { name: 'createCollection' })
  async createCollection(@Args() createCollection: CreateCollectionDTO) {
    const collection = this.collectionService.createCollection(createCollection)
    return collection
  }
}
