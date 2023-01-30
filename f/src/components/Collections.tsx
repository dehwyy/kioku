import React from "react"
import { Box, Button, Grid, Typography } from "@mui/material"
import localFont from "@next/font/local"
import { useRouter } from "next/router"
import { Forward } from "@mui/icons-material"

const LogoFont = localFont({ src: "../fonts/galey-r.ttf" })
const FieldFont = localFont({ src: "../fonts/gp-reg.otf" })
const AuthorFont = localFont({ src: "../fonts/gravitica.otf" })
const Collections = ({ collections }: { collections: IUserCollection[] }) => {
  const router = useRouter()
  const col = [
    { id: 1, title: "Japanese", author: "dehwyy", theme: "words", quizCards: 37 },
    { id: 2, title: "Russian", author: "Mike", theme: "words", quizCards: 264 },
    { id: 3, title: "English", author: "Joel", theme: "words", quizCards: 641 },
    { id: 4, title: "Phones", author: "John", theme: "phone numbers", quizCards: 11 },
    { id: 10, title: "Cars", author: "bazz", theme: "names of cars", quizCards: 35 },
    { id: 11, title: "Dates", author: "bar", theme: "important dates", quizCards: 71 },
    { id: 12, title: "History", author: "foo", theme: "historical information", quizCards: 64 },
  ]
  const c = collections || col
  return (
    <Grid container rowSpacing="5px" columnSpacing="5px" gap="50px 50px" justifyContent="center" data-cy="collectionsWrapper">
      {c.map(collection => (
        <Grid display="flex" flexDirection="column" justifyContent="space-between" p="10px" item key={collection._id} xs={5} height="200px" style={{ border: "2px solid black", boxShadow: "2px 2px 1px #222222", borderRadius: "5px", backgroundColor: "rgba(255, 255, 255, 1)" }}>
          <Typography align="center" style={{ ...LogoFont.style, textDecoration: "underline 2px" }} fontWeight="600" fontSize="1.2rem">
            {collection.collectionName}
          </Typography>
          <Typography style={FieldFont.style} fontWeight="500">
            theme:
            <Typography component={"span"} fontWeight="600" style={LogoFont.style} pl="5px">
              {collection.theme}
            </Typography>
          </Typography>
          <Typography style={FieldFont.style} fontWeight="500">
            quiz-cards:
            <Typography component={"span"} fontWeight="600" style={LogoFont.style} pl="5px">
              {collection.quizCards.length}
            </Typography>
          </Typography>
          <Box display="flex" justifyContent="space-between" alignItems="start">
            <Typography>
              by
              <Typography component={"span"} fontWeight="600" style={AuthorFont.style} pl="5px" onClick={() => router.push(`/user/${collection.authorId}`)}>
                {collection.author}
              </Typography>
            </Typography>
            <Button data-cy="popularCollectionsButton" endIcon={<Forward />} color="warning" variant="contained" size="small" style={FieldFont.style} onClick={() => "none"}>
              more
            </Button>
          </Box>
        </Grid>
      ))}
    </Grid>
  )
}

export default Collections
