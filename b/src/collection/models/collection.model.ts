import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType({ description: 'CollectionModel' })
export default class CollectionQL {
  @Field({ nullable: false })
  collectionName: string
}
