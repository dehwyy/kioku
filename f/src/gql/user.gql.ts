import { gql } from "@apollo/client"

const createUser = gql`
  mutation createUser($username: String!, $password: String!, $email: String!) {
    register(username: $username, email: $email, password: $password, cards: [], quizCards: [], collections: []) {
      token
      user {
        _id
      }
    }
  }
`

const loginUser = gql`
  mutation login($password: String!, $email: String!) {
    login(password: $password, email: $email) {
      user {
        _id
      }
      token
    }
  }
`

export class UserRequest {
  static get createUser() {
    return createUser
  }
  static get loginUser() {
    return loginUser
  }
}
