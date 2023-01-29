import { gql } from "@apollo/client"

const createUser = gql`
  mutation createUser($username: String!, $password: String!, $email: String!) {
    register(username: $username, email: $email, password: $password, quizCards: [], collections: []) {
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

const getUserById = gql`
  query getUser($userId: ID!) {
    user(id: $userId) {
      email
      username
      collections {
        _id
        likes
        collectionName
        quizCards {
          _id
          quizCardName
          likes
        }
      }
      quizCards {
        _id
        likes
        quizCardName
        cards {
          _id
        }
      }
    }
  }
`

const getUserByUsername = gql`
  mutation getUserByUsername($username: String!) {
    userByAttr(username: $username)
  }
`

export class UserRequest {
  static get createUser() {
    return createUser
  }
  static get loginUser() {
    return loginUser
  }
  static get getUserById() {
    return getUserById
  }
  static get getUserByUsername() {
    return getUserByUsername
  }
}
