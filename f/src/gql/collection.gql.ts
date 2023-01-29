import { gql } from "@apollo/client"

const createCollection = gql`
  mutation createCollection($collectionName: String!, $creatorUsername: String!, $creatorId: ID!, $theme: String!) {
    createCollection(quizCards: [], collectionName: $collectionName, creator: $creatorUsername, creatorId: $creatorId, theme: $theme) {
      _id
    }
  }
`

const getCollection = gql`
  query getCollection($id: ID!) {
    collection(id: $id) {
      theme
      creatorId
      creator
      collectionName
      likes
      quizCards {
        _id
      }
    }
  }
`

export class CollectionRequest {
  static get createCollection() {
    return createCollection
  }
  static get getCollection() {
    return getCollection
  }
}
