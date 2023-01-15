import React from "react"
import { Box, Button, Typography } from "@mui/material"
import { FavoriteBorder, Forward } from "@mui/icons-material"
import localFont from "@next/font/local"

const FieldFont = localFont({ src: "../fonts/gp-reg.otf" })
const FieldFont2 = localFont({ src: "../fonts/galey-r.ttf" })
const CardsWrapper = () => {
  const QuizCards = [
    { title: "Japanese kanji", id: 1, wordsCount: 101, likes: 122 },
    { title: "Math", id: 2, wordsCount: 101, likes: 56 },
    { title: "Python snippets", id: 3, wordsCount: 101, likes: 144 },
    { title: "Capitals of Africa", id: 4, wordsCount: 101, likes: 713 },
  ]
  return (
    <Box display="flex" flexDirection="column" gap="25px">
      {QuizCards.map(card => (
        <Box key={card.id} p="30px" gap="50px" bgcolor="white" display="flex" justifyContent="space-between" alignItems="center" sx={{ boxShadow: "2px 2px 1px black", border: "2px solid #222222", borderRadius: "5px" }}>
          <Box textAlign="center">
            <Typography style={FieldFont.style}>words: {card.wordsCount}</Typography>
            <Button
              style={FieldFont.style}
              sx={{
                borderRadius: "15px",
              }}
              startIcon={<FavoriteBorder />}
              color="secondary">
              {card.likes}
            </Button>
          </Box>
          <Typography style={FieldFont2.style} letterSpacing="3px" fontWeight="600" fontSize="1.5rem" sx={{ textDecoration: "underline 1.5px #222222" }}>
            {card.title}
          </Typography>
          <Button variant="contained" color="warning" endIcon={<Forward />} style={FieldFont.style}>
            learn
          </Button>
        </Box>
      ))}
    </Box>
  )
}

export default CardsWrapper
