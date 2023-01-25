import request from 'supertest-graphql'
import gql from 'graphql-tag'
import { INestApplication } from '@nestjs/common'
import {
  createCard, createCollection,
  createMockModule,
  createQuizCard,
  deleteUserTest,
  registerUserTest,
} from "./utils"

describe('collection e2e', () => {
  let app: INestApplication
  let userId: string
  let cardId: string
  let quizCardId: string
  let collectionId: string
  let jwtToken: string
  const extraPayload = {
    password: "newPassword",
    email: "newEmail",
    username: "newUsername"
  }
  beforeEach(async () => {
    app = await createMockModule()
  })
  it('register user', async () => {
    const {data} = await registerUserTest({app})
    const {token, user} = data.register
    userId = user._id
    jwtToken = token
  })

  it("update to user's lists", async () => {
    //creating card
    const {data: cardData} = await createCard<"createCard">({face: "face", backface:"backface", token: jwtToken, app})
    cardId = cardData.createCard._id
    //creating quizCard
    const {data: quizCardData} = await createQuizCard({quizCardName: "quizCard", cards: [cardId], token: jwtToken, app})
    quizCardId = quizCardData.createQuizCard._id
    //creating collection
    const {data: collectionData} = await createCollection({token: jwtToken, app, idQuizCard1: quizCardId})
    collectionId = collectionData.createCollection._id
    //adding everything to userLists
    await request<Record<"pushToUserList", Record<string, string[]>>>(app.getHttpServer()).mutate(gql`
        mutation pushToUserLists($cards: [String]!,$quizCards: [String]!, $collections: [String]!, $id: ID! ) {
            pushToUserList(quizCards: $quizCards, collections: $collections, cards: $cards,id: $id) {
                collections {
                    collectionName
                }
                quizCards {
                    quizCardName
                }
                cards {
                    face
                }
            }
        }
    `)
      .variables({id: userId, cards: [cardId], quizCards: [quizCardId], collections: [collectionId]})
      .set('authorization', `Bearer ${jwtToken}`).expectNoErrors()
    //changing user static data
    await request<Record<"updateUser", Record<string, string>>>(app.getHttpServer()).mutate(gql`
        mutation updateInfo($username: String!, $email: String!, $password: String!, $id: ID!) {
            updateUser(username: $username, email: $email, password: $password, id: $id) {
                password
                email
                username
            }
        }
    `)
    .variables({id: userId, ...extraPayload})
    .set('authorization', `Bearer ${jwtToken}`)
    //removing <array> items from user
    const {data: removeFromLists} = await request<Record<"removeFromUserList", Record<string, string[]>>>(app.getHttpServer()).mutate(gql`
        mutation removeFromUserList($cards: [String]!,$quizCards: [String]!, $collections: [String]!, $id: ID! ) {
            removeFromUserList(quizCards: $quizCards, collections: $collections, cards: $cards,id: $id) {
                collections {
                    collectionName
                }
                quizCards {
                    quizCardName
                }
                cards {
                    face
                }
            }
        }
    `)
    .variables({id: userId, cards: [cardId], quizCards: [quizCardId], collections: [collectionId]})
    .set('authorization', `Bearer ${jwtToken}`)
    //checking if <array> items were added before(mongoose return before update state)
    const {collections, quizCards, cards} = removeFromLists.removeFromUserList
    expect(collections.length).toBe(1)
    expect(quizCards.length).toBe(1)
    expect(cards.length).toBe(1)
  })

  it("get user", async () => {
    //getting user
    const {data} = await request<Record<"user", any>>(app.getHttpServer()).query(gql`
        query getUser($id: ID!) {
            user(id: $id) {
                password
                email
                username
                collections {
                    collectionName
                }
                quizCards {
                    quizCardName
                }
                cards {
                    face
                }
            }
        }
    `).variables({id: userId}).set('authorization', `Bearer ${jwtToken}`)
    const {password, email, username, collections, quizCards, cards} = data.user
    expect(password).toBe(extraPayload.password)
    expect(email).toBe(extraPayload.email)
    expect(username).toBe(extraPayload.username)
    expect(collections.length).toBe(0)
    expect(quizCards.length).toBe(0)
    expect(cards.length).toBe(0)
  })

  it('delete user', async () => {
    const {data} = await deleteUserTest({app, token: jwtToken, id: userId})
    expect(data).toBeTruthy()
  })
})
