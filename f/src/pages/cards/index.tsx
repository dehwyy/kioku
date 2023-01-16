import React from "react"
import { Box, Typography } from "@mui/material"
import CardsWrapper from "../../components/Cards"
import { useInView } from "react-intersection-observer"
import localFont from "@next/font/local"
const FieldFont2 = localFont({ src: "../../fonts/aquire-bold.otf", display: "swap" })
const Cards = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    delay: 1500,
    trackVisibility: true,
  })
  const styleTransition = prop => ({ transition: "1s ease", transform: prop ? "translateY(0)" : "translateY(25px)", opacity: inView ? "1" : "0" })

  return (
    <Box ref={ref} sx={styleTransition(inView)}>
      <Typography align="center" sx={{ m: "50px 0" }} fontSize="2rem" fontWeight="400" style={FieldFont2.style}>
        Best quiz-cards
      </Typography>
      <CardsWrapper />
    </Box>
  )
}

export default Cards
