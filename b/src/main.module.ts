import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import * as dotenv from 'dotenv'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import CardModule from './card/card.module'
import QuizCardModule from './quizCard/quizCard.module'
import CollectionModule from '@src/collection/collection.module'
import { join } from 'path'
import { UserModule } from './user/user.module'

dotenv.config()
const DATABASE = process.env.DATABASE
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      cors: {
        origin: 'http://localhost:3000',
        credentials: true,
      },
    }),
    MongooseModule.forRoot(DATABASE),
    CardModule,
    QuizCardModule,
    CollectionModule,
    UserModule,
  ],
})
export class MainModule {}
