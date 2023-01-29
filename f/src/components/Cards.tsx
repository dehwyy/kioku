import React from "react"
import { Box, Button, Typography } from "@mui/material"
import { FavoriteBorder, Forward } from "@mui/icons-material"
import localFont from "@next/font/local"
import { useRouter } from "next/router"
import { useQuery } from "@apollo/client"
import { UserRequest } from "../gql/user.gql"

const TitleFont = localFont({ src: "../fonts/galey-r.ttf" })
const FieldFont = localFont({ src: "../fonts/gp-reg.otf" })

const CardsWrapper = () => {
  const QuizCards = [
    { title: "Japanese kanji", id: 1, wordsCount: 101, likes: 122 },
    { title: "Math", id: 2, wordsCount: 101, likes: 56 },
    { title: "Python snippets", id: 3, wordsCount: 101, likes: 144 },
    { title: "Capitals of Africa", id: 4, wordsCount: 101, likes: 713 },
  ]
  const router = useRouter()
  const { data } = useQuery<{ user: IUserData }>(UserRequest.getUserById, { variables: { userId: router.query.userId } })
  const routerLink = async card => {
    const cardId = card._id
    const url = router.asPath
    const routerQuery = router?.query
    const link = routerQuery?.quizCardId ? `${url}/${cardId}` : routerQuery?.userId ? `/cards/${cardId}/${cardId}` : `${url}/${cardId}/${cardId}`
    await router.push(link)
  }
  console.log(data)
  return (
    <Box data-cy="cardsCardsList" display="flex" flexDirection="column" gap="25px">
      {data.user.quizCards.map(quizCard => (
        <Box data-cy="quizCardsItem" key={quizCard._id} p="30px" gap="50px" bgcolor="white" display="flex" justifyContent="space-between" alignItems="center" sx={{ boxShadow: "2px 2px 1px black", border: "2px solid #222222", borderRadius: "5px" }}>
          <Box textAlign="center">
            <Typography style={FieldFont.style}>words: {quizCard.cards.length}</Typography>
            <Button
              style={FieldFont.style}
              sx={{
                borderRadius: "15px",
              }}
              startIcon={<FavoriteBorder />}
              color="secondary">
              {quizCard.likes}
            </Button>
          </Box>
          <Typography style={TitleFont.style} letterSpacing="3px" fontWeight="600" fontSize="1.5rem" sx={{ textDecoration: "underline 1.5px #222222" }}>
            {quizCard.quizCardName}
          </Typography>
          <Button variant="contained" color="warning" endIcon={<Forward />} style={FieldFont.style} onClick={() => routerLink(quizCard)} data-cy="quizCardButton">
            learn
          </Button>
        </Box>
      ))}
    </Box>
  )
}

export default CardsWrapper
