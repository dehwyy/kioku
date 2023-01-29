import { gql } from "@apollo/client"

const getQuizCard = gql`
  query getQuizCard($id: ID!) {
    quizCard(id: $id) {
      likes
      quizCardName
      _id
      cards {
        likes
        face
        backface
        _id
      }
    }
  }
`

export class QuizCardRequest {
  static get getQuizCard() {
    return getQuizCard
  }
}
