import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import CollectionDB, {
  CollectionSchema,
} from '@src/collection/models/collection.schema'
import CollectionResolver from '@src/collection/collection.resolver'
import CollectionService from '@src/collection/collection.service'
import QuizCardModule from '@src/quizCard/quizCard.module'
import AuthTokenDB, { AuthTokenSchema } from '@src/auth/models/auth.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CollectionDB.name, schema: CollectionSchema },
    ]),
    QuizCardModule,
  ],
  exports: [],
  providers: [CollectionResolver, CollectionService],
})
export default class CollectionModule {}
