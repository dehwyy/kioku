import React from "react"
import { Box, Button, Typography } from "@mui/material"
import localFont from "@next/font/local"
import Image from "next/image"
import { useRouter } from "next/router"
import useTransitionHook from "../hooks/useTransitionHook"
import { gql, useQuery } from "@apollo/client"

const GET_USER = gql`
  query getUser($id: ID!) {
    user(id: $id) {
      username
      _id
    }
  }
`

const TextFont = localFont({ src: "../fonts/galey-r.ttf", display: "swap" })
const TitleFont = localFont({ src: "../fonts/aquire-bold.otf", display: "swap" })
const Index = () => {
  const { data } = useQuery(GET_USER, { variables: { id: "63d240bc9f62a7f60752b7b1" } })
  const { ref: firstBlockRef, styleTransition: firstBlockTransition } = useTransitionHook({ delay: 1500 })
  const { ref: secondBlockRef, styleTransition: secondBlockTransition } = useTransitionHook()
  const router = useRouter()
  return (
    <Box mt="50px" p="50px 0 0" borderRadius="10px 10px 0 0">
      <Box ref={firstBlockRef} sx={firstBlockTransition} pb="50px">
        <Box textAlign="center">
          <Typography style={TitleFont.style} fontSize="3.2rem" sx={{ color: "secondary.contrastText" }}>
            UseMemorize
          </Typography>
          <Typography fontSize="1rem" fontWeight="600" style={TextFont.style} sx={{ color: "primary.contrastText" }} pb="10px">
            Complete solution for memorizing any information
          </Typography>
          <Image width={400} height={400} alt="preview" data-cy="previewImage" src={"https://sun1-83.userapi.com/impg/-YEwOep1yOHZmV6F3-Z8XC_HP2GDiOoEP6XekA/_OTpcMMEyNI.jpg?size=828x807&quality=95&sign=89373c2f858271c65aae3d19fd2beb59&type=album"} />
        </Box>
      </Box>
      <Box ref={secondBlockRef} sx={secondBlockTransition}>
        <Box textAlign="center">
          <Typography style={TextFont.style} fontSize="3rem" fontWeight="600" sx={{ color: "secondary.contrastText" }}>
            Inspiration
          </Typography>
          <Typography component="div" display="flex" flexDirection="column" gap="15px" fontSize="1rem" fontWeight="600" style={TextFont.style} sx={{ color: "primary.contrastText" }}>
            App was created mainly for me
            <Button variant="contained" color="inherit" sx={{ alignSelf: "center" }} onClick={() => router.push("/login")}>
              Sign up for free
            </Button>
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Index

// export async function getStaticProps() {
//   const apolloClient = initializeApollo()
//   const a = await apolloClient.query({
//     query: UserRequest.createUser,
//     variables: {
//       id: "63d240bc9f62a7f60752b7b1",
//     },
//   })
//   console.log(a.data)
//   return addApolloState(apolloClient, { props: {} })
// }
