import React from "react"
import { Box, Typography } from "@mui/material"
import CardsWrapper from "../../components/Cards"
import localFont from "@next/font/local"
import useTransitionHook from "../../hooks/useTransitionHook"
const FieldFont2 = localFont({ src: "../../fonts/aquire-bold.otf", display: "swap" })
const Cards = () => {
  const { ref, styleTransition } = useTransitionHook({ delay: 1500 })
  return (
    <Box ref={ref} sx={styleTransition}>
      <Typography align="center" sx={{ m: "50px 0" }} fontSize="2rem" fontWeight="400" style={FieldFont2.style}>
        Best quiz-cards
      </Typography>
      <CardsWrapper />
    </Box>
  )
}

export default Cards
