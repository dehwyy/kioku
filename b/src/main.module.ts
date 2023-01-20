import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import * as dotenv from 'dotenv'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import CardModule from './card/card.module'
import QuizCardModule from './quizCard/quizCard.module'

dotenv.config()
const DATABASE = process.env.DATABASE
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      cors: {
        origin: 'http://localhost:3000',
        credentials: true,
      },
    }),
    MongooseModule.forRoot(DATABASE),
    CardModule,
    QuizCardModule,
  ],
})
export class MainModule {}
