type TabsValuesT = "collections" | "cards" | "three"
interface inLoginData {
  email: string
  password: string
}

interface IUserCard {
  face: string
  backface: string
  _id: string
  likes: string[]
}

interface IUserQuizCard {
  _id: string
  quizCardName: string
  likes: string[]
  cards: IUserCard[]
}

interface IUserCollection {
  likes: string[]
  _id: string
  collectionName: string
  quizCards: IUserQuizCard[]
  theme: string
  author: string
  authorId: string
}

interface IUserData {
  email: string
  username: string
  collections: IUserCollection[]
  quizCards: IUserQuizCard[]
  cards: {
    _id: string
  }
}