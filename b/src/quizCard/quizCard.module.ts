import { Module } from '@nestjs/common'
import QuizCardResolver from './quizCard.resolver'
import QuizCardService from './quizCard.service'
import { MongooseModule } from '@nestjs/mongoose'
import QuizCardDB, { QuizCardSchema } from './models/quizCard.schema'
import CardModule from '@src/card/card.module'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: QuizCardDB.name, schema: QuizCardSchema },
    ]),
    CardModule,
  ],
  providers: [QuizCardResolver, QuizCardService],
})
export default class QuizCardModule {}
