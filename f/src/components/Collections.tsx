import React from "react"
import { Box, Button, Container, Grid, Typography } from "@mui/material"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import localFont from "@next/font/local"

const LogoFont = localFont({ src: "../fonts/galey-r.ttf" })
const FieldFont = localFont({ src: "../fonts/gp-reg.otf" })
const FieldFont2 = localFont({ src: "../fonts/gravitica.otf" })
const Collections = () => {
  const col = [
    { id: 1, title: "JAPANESE", author: "dehwyy", theme: "aloha", wordsCount: 123 },
    { id: 2, title: "RUSSIAN", author: "waypo1nt", theme: "aloha", wordsCount: 123 },
    { id: 3, title: "EIGO", author: "stepan", theme: "aloha", wordsCount: 123 },
    { id: 4, title: "KEYAB", author: "whitecat", theme: "aloha", wordsCount: 123 },
    { id: 10, title: "KEYdsadasAB", author: "whitecat", theme: "aloha", wordsCount: 123 },
    { id: 11, title: "KEYAsdadasdB", author: "whitecat", theme: "aloha", wordsCount: 123 },
    { id: 12, title: "KEYAdsaaasB", author: "whitecat", theme: "aloha", wordsCount: 123 },
    { id: 13, title: "KEYdasdasAB", author: "whitecat", theme: "aloha", wordsCount: 123 },
  ]
  return (
    <Grid container rowSpacing="5px" columnSpacing="5px" gap="50px 50px" justifyContent="center">
      {col.map(card => (
        <Grid display="flex" flexDirection="column" justifyContent="space-between" p="10px" item key={card.id} xs={5} height="200px" style={{ border: "2px solid black", boxShadow: "2px 2px 1px #222222", borderRadius: "5px", backgroundColor: "rgba(255, 255, 255, 1)" }}>
          <Typography align="center" style={{ ...LogoFont.style, textDecoration: "underline 2px" }} fontWeight="600" fontSize="1.2rem">
            {card.title}
          </Typography>
          <Typography style={FieldFont.style} fontWeight="500">
            theme:
            <Typography component={"span"} fontWeight="600" style={LogoFont.style} pl="5px">
              {card.theme}
            </Typography>
          </Typography>
          <Typography style={FieldFont.style} fontWeight="500">
            words:
            <Typography component={"span"} fontWeight="600" style={LogoFont.style} pl="5px">
              {card.wordsCount}
            </Typography>
          </Typography>
          <Box display="flex" justifyContent="space-between" alignItems="start">
            <Typography>
              by
              <Typography component={"span"} fontWeight="600" style={FieldFont2.style} pl="5px">
                {card.author}
              </Typography>
            </Typography>
            <Button endIcon={<MoreHorizIcon />} color="warning" variant="contained" size="small" style={FieldFont.style}>
              more
            </Button>
          </Box>
        </Grid>
      ))}
    </Grid>
  )
}

export default Collections
