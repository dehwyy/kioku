import React from "react"
import { Box, Typography } from "@mui/material"
import CardsWrapper from "../../../components/Cards"
import { useInView } from "react-intersection-observer"
import localFont from "@next/font/local"
import { GetServerSidePropsContext } from "next"
import { addApolloState, initializeApollo } from "../../../tools/apolloClient"
import { UserRequest } from "../../../gql/user.gql"
import { useQuery } from "@apollo/client"
import { QuizCardRequest } from "../../../gql/quizCard.gql"
import { useRouter } from "next/router"
const FieldFont2 = localFont({ src: "../../../fonts/aquire-bold.otf", display: "swap" })
const Cards = () => {
  const router = useRouter()
  const { ref, inView } = useInView({
    triggerOnce: true,
    delay: 1500,
    trackVisibility: true,
  })
  const styleTransition = prop => ({ transition: "1s ease", transform: prop ? "translateY(0)" : "translateY(25px)", opacity: inView ? "1" : "0" })
  console.log(router.query)
  const { data } = useQuery(QuizCardRequest.getQuizCard, {
    variables: {
      id: router.query.quizCardId,
    },
  })
  return (
    <Box ref={ref} sx={styleTransition(inView)}>
      <Typography align="center" sx={{ m: "50px 0" }} fontSize="2rem" fontWeight="400" style={FieldFont2.style}>
        Quiz-cards
      </Typography>
      <CardsWrapper quizCards={data.quizCards} />
    </Box>
  )
}

export default Cards

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const apolloClient = initializeApollo()
  await apolloClient.query({
    query: QuizCardRequest.getQuizCard,
    variables: {
      id: query.quizCardId,
    },
  })
  return addApolloState(apolloClient, { props: {} })
}
